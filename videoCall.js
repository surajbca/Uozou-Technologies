const APP_ID = "e1fbca2ba90747faa36c852bb13716df";
const TOKEN =
  "007eJxTYIg+uTaFxXbb79cPNp07PkMm94e4XdGN+usLHU86nOHSXH1LgSHVMC0pOdEoKdHSwNzEPC0x0dgs2cLUKCnJ0Njc0Cwl7UKkVlpDICNDb/BCJkYGCATxWRhyEzPzGBgAGJshyQ==";
const CHANNEL = "main";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {
  try {
    client.on("user-published", handleUserJoined);

    client.on("user-left", handleUserLeft);

    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

    let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}"></div>
                  </div>`;
    document
      .getElementById("video-streams")
      .insertAdjacentHTML("beforeend", player);

    localTracks[1].play(`user-${UID}`);

    await client.publish([localTracks[0], localTracks[1]]);
  } catch (error) {
    console.error("Error joining and displaying local stream:", error);
    // Handle error here, such as showing an error message to the user
  }
};

let joinStream = async () => {
  try {
    await joinAndDisplayLocalStream();
    document.getElementById("join-btn").style.display = "none";
    document.getElementById("stream-controls").style.display = "flex";
  } catch (error) {
    console.error("Error joining stream:", error);
  }
};

let handleUserJoined = async (user, mediaType) => {
  try {
    remoteUsers[user.uid] = user;
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      let player = document.getElementById(`user-container-${user.uid}`);
      if (player != null) {
        player.remove();
      }

      player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}"></div> 
                 </div>`;
      document
        .getElementById("video-streams")
        .insertAdjacentHTML("beforeend", player);

      user.videoTrack.play(`user-${user.uid}`);
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  } catch (error) {
    console.error("Error handling user joined:", error);
    // Handle error here, such as showing an error message to the user
  }
};

let handleUserLeft = async (user) => {
  try {
    delete remoteUsers[user.uid];
    document.getElementById(`user-container-${user.uid}`).remove();
  } catch (error) {
    console.error("Error handling user left:", error);
    // Handle error here, such as showing an error message to the user
  }
};

let leaveAndRemoveLocalStream = async () => {
  try {
    for (let i = 0; localTracks.length > i; i++) {
      localTracks[i].stop();
      localTracks[i].close();
    }

    await client.leave();
    document.getElementById("join-btn").style.display = "block";
    document.getElementById("stream-controls").style.display = "none";
    document.getElementById("video-streams").innerHTML = "";
  } catch (error) {
    console.error("Error leaving and removing local stream:", error);
    // Handle error here, such as showing an error message to the user
  }
};

let toggleMic = async (e) => {
  try {
    if (localTracks[0].muted) {
      await localTracks[0].setMuted(false);
      e.target.innerText = "Mic on";
      e.target.style.backgroundColor = "cadetblue";
    } else {
      await localTracks[0].setMuted(true);
      e.target.innerText = "Mic off";
      e.target.style.backgroundColor = "#EE4B2B";
    }
  } catch (error) {
    console.error("Error toggling microphone:", error);
    // Handle error here, such as showing an error message to the user
  }
};

let toggleCamera = async (e) => {
  try {
    if (localTracks[1].muted) {
      await localTracks[1].setMuted(false);
      e.target.innerText = "Camera on";
      e.target.style.backgroundColor = "cadetblue";
    } else {
      await localTracks[1].setMuted(true);
      e.target.innerText = "Camera off";
      e.target.style.backgroundColor = "#EE4B2B";
    }
  } catch (error) {
    console.error("Error toggling camera:", error);
    // Handle error here, such as showing an error message to the user
  }
};

document.getElementById("join-btn").addEventListener("click", joinStream);
document
  .getElementById("leave-btn")
  .addEventListener("click", leaveAndRemoveLocalStream);
document.getElementById("mic-btn").addEventListener("click", toggleMic);
document.getElementById("camera-btn").addEventListener("click", toggleCamera);
