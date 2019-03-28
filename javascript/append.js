function sample() {
	 var h2 =document.createElement('h2');
	h2.innerText="Im new element";
	h2.setAttribute('class','heading');
	h2.style.backgroundColor="yellow";
  document.body.appendChild(h2);
  document.getElementsByClassName('div')[0].appendChild(h2);
}