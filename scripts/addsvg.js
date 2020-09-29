const svgAll = svgs.returnAll()

function addElement () { 
	// 新しい div 要素を作成します 
	const newDiv = document.createElementNS("http://www.w3.org/2000/svg", "svg"); 
	newDiv.innerHTML = svgAll; 
	const h1 = document.getElementsByTagName('h1')[0];
	document.body.insertBefore(newDiv, h1);
}

	
document.addEventListener('DOMContentLoaded', addElement);