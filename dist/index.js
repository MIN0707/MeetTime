const chats = document.getElementById('chats');
const chatWindow = document.getElementById('chatWindow');
const chatOpenButton = document.getElementById('chatOpenButton');

function openChat() {
	chatWindow.classList.remove('hidden');
}

function closeChat() {
	chatWindow.classList.add('hidden');
}

function addMessage(isMine, message) {
	chats.insertAdjacentHTML(
		'beforeend',
		`<div class="flex flex-col">
  <h3 class="text-sm font-semibold">${isMine ? '나' : '상대'}</h3>
  <p class="text-sm">${message}</p>
</div>`,
	);
}
