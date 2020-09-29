const svgs = {
	//allの中にsvgのパスを格納していけば外部ファイルに追加していける。
	all: ['\
				<defs>\
					<symbol id="download" viewBox="0 0 164 45">\
						<path d="M0 3C0 1.34315 1.33152 0 2.98838 0C15.6933 0 52.8204 0 82 0C111.114 0 148.441 0 161.007 0C162.664 0 164 1.34315 164 3V42C164 43.6569 162.657 45 161 45H3C1.34314 45 0 43.6569 0 42V3Z" />\
					</symbol>\
				</defs>\
			'
		],
	
	returnAll: function() {
		return this.all.reduce(function(sum, svg) {
			return sum + svg
		}, '')
		
	} 
	
}




 