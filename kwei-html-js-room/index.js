const kwei = require("kwei-client-js-sdk");

const room = new kwei.Room();

room.init("your-api-key", "your-secret-key").then(() => {
  room
    .joinRoom("my room")
    .then(() => {
      room.localParticipant.enableVideo(true).then(() => {
        localVideo.srcObject = room.localParticipant.getLocalStream();
      });
    })
    .catch((error) => {
      console.error("Error joining room ", error);
    });
});

room.on("TrackSubscribed", (track, remoteProducerId, startStreaming) => {
  const newElem = document.createElement("div");
  newElem.setAttribute("id", `td-${remoteProducerId}`);
  newElem.setAttribute("class", "remoteVideo");

  newElem.innerHTML =
    '<video muted id="' +
    remoteProducerId +
    '" autoplay class="video"></video>';
  videoContainer.appendChild(newElem);
  document.getElementById(remoteProducerId).srcObject = track;

  startStreaming();
});

room.on("ParticipantDisconnected", (remoteProducerId) => {
  videoContainer.removeChild(document.getElementById(`td-${remoteProducerId}`));
  console.log("Participant left:", remoteProducerId);
});
