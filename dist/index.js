const chats = document.getElementById('chats');
const chatWindow = document.getElementById('chatWindow');
const chatOpenButton = document.getElementById('chatOpenButton');
const form = document.getElementById('form');
const input = document.getElementById('input');
const localCamera = document.getElementById('localCamera');
const toggleMicButton = document.getElementById('toggleMic');
const toggleCameraButton = document.getElementById('toggleCam');

let toggleMic = true;
let toggleCam = true;
let localStream = null;

function toggleChat() {
	chatWindow.classList.toggle('hidden');
}

form.onsubmit = function (event) {
	event.preventDefault();
	if (!input.value) return;
	addMessage(true, input.value);
	input.value = '';
};

function addMessage(isMine, message) {
	chats.insertAdjacentHTML(
		'afterbegin',
		`<div class="flex flex-col">
  <h3 class="text-sm font-semibold">${isMine ? '나' : '상대'}</h3>
  <p class="text-sm">${message}</p>
</div>`,
	);
}

async function getMedia() {
	try {
		localStream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});
		localCamera.srcObject = localStream;
		localCamera.play();
	} catch (error) {
		console.error(error);
	}
}

getMedia();

toggleMicButton.onclick = function () {
	if (!localStream) return;
	toggleMic = !toggleMic;
	toggleMicButton.classList.toggle('bg-red-500');
	toggleMicButton.classList.toggle('text-white');
	localStream.getAudioTracks()[0].enabled = toggleMic;
};

toggleCameraButton.onclick = function () {
	if (!localStream) return;
	toggleCam = !toggleCam;
	toggleCameraButton.classList.toggle('bg-red-500');
	toggleCameraButton.classList.toggle('text-white');
	localStream.getVideoTracks()[0].enabled = toggleCam;
};
