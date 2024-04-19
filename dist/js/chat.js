const chats = document.getElementById('chats');
const chatWindow = document.getElementById('chatWindow');
const chatOpenButton = document.getElementById('chatOpenButton');
const form = document.getElementById('form');
const input = document.getElementById('input');

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
