const socket = io();

const localCamera = document.getElementById('localCamera');
const remoteCamera = document.getElementById('remoteCamera');
const micBtn = document.getElementById('micBtn');
const camBtn = document.getElementById('camBtn');
const idInput = document.getElementById('roomId');

let localStream;
let roomId;
let localPc;

async function start() {
	console.log('start');
	await getMedia();
	makeConnection();
}

async function getMedia() {
	try {
		localStream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});
		localCamera.srcObject = localStream;
		console.log('media');
	} catch (error) {
		document.getElementById('title').innerHTML = error.message;
		console.error(error);
	}
}

async function joinRoom() {
	if (!idInput.value) return;
	await start();
	socket.emit('joinRoom', idInput.value);
	roomId = idInput.value;
	idInput.value = '';
}

function toggleAudio() {
	if (!localStream) return;
	micBtn.classList.toggle('bg-red-500');
	micBtn.classList.toggle('text-white');
	localStream
		.getAudioTracks()
		.forEach((track) => (track.enabled = !track.enabled));
}

function toggleVideo() {
	if (!localStream) return;
	camBtn.classList.toggle('bg-red-500');
	camBtn.classList.toggle('text-white');
	localStream
		.getVideoTracks()
		.forEach((track) => (track.enabled = !track.enabled));
}

socket.on('userJoin', async () => {
	console.log('userJoin');
	const offer = await localPc.createOffer();
	localPc.setLocalDescription(offer);
	socket.emit('offer', roomId, offer);
});

socket.on('offer', async (offer) => {
	console.log('offer');
	localPc.setRemoteDescription(offer);
	const answer = await localPc.createAnswer();
	localPc.setLocalDescription(answer);
	socket.emit('answer', roomId, answer);
});

socket.on('answer', (answer) => {
	console.log('answer');
	localPc.setRemoteDescription(answer);
});

socket.on('candidate', (candidate) => {
	console.log('candidate');
	localPc.addIceCandidate(candidate);
});

function makeConnection() {
	localPc = new RTCPeerConnection({
		iceServers: [
			{
				urls: [
					'stun:stun.l.google.com:19302',
					'stun:stun1.l.google.com:19302',
					'stun:stun2.l.google.com:19302',
					'stun:stun3.l.google.com:19302',
					'stun:stun4.l.google.com:19302',
				],
			},
			{
				urls: 'turn:lulu24.metered.live',
				username: '77d7a80e71039f2f15a3e711',
				credential: 'JrUB4uYr4NLz4Ri/',
			},
		],
	});
	localPc.addEventListener('icecandidate', (data) => {
		console.log('icecandidate', data);
		if (!data.candidate) return;
		socket.emit('candidate', roomId, data.candidate);
	});
	localPc.addEventListener('addstream', (data) => {
		console.log('remote stream', data.stream.getTracks());
		remoteCamera.srcObject = data.stream;
		remoteCamera.play();
		remoteCamera.classList.remove('w-full');
		console.log(remoteCamera.srcObject);
	});
	localStream
		.getTracks()
		.forEach((track) => localPc.addTrack(track, localStream));
	console.log('stream', localStream.getTracks());
}
