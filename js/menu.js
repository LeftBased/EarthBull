function objToString(object) {
  var str = '';
  for (var k in object) {
    if (object.hasOwnProperty(k)) {
      str += k + '::' + object[k] + '\n';
    }
  }
};
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
//document.querySelectorAll( 'player' ).forEach((item) => {
	//new YT.Player(item, {
	player = new YT.Player( 'player' , { //'ytplayer', {
		
		 // player = new YT.Player('player', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
    });
  }
		//playerVars: {'wmode': transparent, 'volume': 50,'playsinline': 1, 'rel':0 , 'autoplay': 1, 'loop':1, 'controls':1, 'start':0, 'autohide':0,'wmode':'opaque', 'modestbranding':1},
		/*
		events: {
			'onReady': function (event) {
			  event.target.setSize(width=1280, height=720);
			  event.target.setVolume(60);
			  event.target.playVideo();
			}
			,'onStateChange': function (event) {
				if (event.data == YT.PlayerState.ENDED) {
					event.target.seekTo(0);
					event.target.playVideo();
					player.playVideo();
				} 
			}
	}
}
,)})};
*/
function onPlayerReady(event) {
	
	event.target.setVolume(60);
	event.target.playVideo();
  };
function onStateChange(event){
	if (event.data == YT.PlayerState.ENDED) {
		event.target.seekTo(0);
		event.target.playVideo();
		player.playVideo();
	}
};
function changeLOG(){
	var data = '<label>[CHANGELOG]</label>' +
	'<b>10.03.2021</b><br/>' +
	'• Added an 80s playlist.<br/>' + 
	'<b>10.02.2021</b><br/>' +
	'• Fixed YouTube player embed code. More improved!</br>' +
	'<b>09.29.2021</b><br/>' + 
	'• Added a MAC Address Generator<br/>' +
	'• Added a daily bible verse<br/>' + 
	'<b>09.28.2021</b><br/>' + 
	'• Added a playlist selector<br/>' + 
	'<b>09.26.2021</b><br/>' +
	'• Added music video and documentary data in json files.<br/>' +
	'• Cleaned up code in javascript.<br/>' +
	'<b>09.25.2021</b><br/>' +
	'• Improved youtube embed.<br/>' +
	'• Added random track & documentary buttons to embed.<br/>' +
	'<b>09.24.2021</b><br/>' +
	'• Added an audio player.<br/>' +
	'• Updated navigation bar.<br/>' +
	'• Improved dimensions of youtube embed.<br/>' +
	'• Improved psychedelic mode w/more rng.<br/>' +
	'• Added SearchScene Idle Bot</br>' + 
	'<b>09.23.2021</b><br/>' +
	'• Updated psychedelic mode with more visuals and animated.<br/>' +
	'• Fixed prng issues in various scripts.<br/>' +
	'• Optimized psychedelic images.<br/>' +
	'<b>09.22.2021</b><br/>' + 
	'• Updated the YouTube code features HD and SD buttons.<br/>' +
	'• Added a rng documentary button featuring documentaries.<br/>' + 
	'• Cleaned up the javascript code for menu bar.<br/>' + 
	'• Fixed up menu layout and reduced button size.<br/>' + 
	'• Added a proof-in-concept Presearch.IO Idle Bot.<br/>' +
	'<button type="button" onclick="CloseLOG();">Close Log</button>';
	return String(data);
};
function CloseLOG(){
	updateLOG("");
};
function updateLOG(data){
	$( "div.box5" ).html(data);
};
var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;
function seed(i) {
    m_w = (123456789 + i) & mask;
    m_z = (987654321 - i) & mask;
};
function random()
{
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
};
const HEX = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
var modi = "";
var text='';
function DrawListBox(){
	ListBox = '<select id="playlist" style="background: black; color:#BEEEF3; width:150px; height:50px;">' +
	'<option>Default List</option>' +
	'<option>Documentaries</option>' + 
	'<option>MF Doom</option>' +
	'<option>Hip-Hop</option>' +
	'<option>The 80s</option>' +
	'</select><button id="button" type="button" onclick="SavePlaylist();">Save Playlist</button>';
$("div.box6").html(ListBox);
};
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
};
function DrawMACGen(){
	const DrawForm = '<label>Divider Options: </label><select id="dividerOpts" style="background: black; color:#BEEEF3; width:190px; height:50px;">' +
	'<option>0420DEADBEEF</option>' + 
	'<option>04-20-DE-AD-BE-EF</option>' +
	'<option>04:20:DE:AD:BE:EF</option>' +
	'<option>04.20.DE.AD.BE.EF</option></select>' +
	'<label># of MACs:</label>' +
	'<input type="text" id="macopts" name="macopts" required minlength="1" maxlength="6" size="10" style="width: 80px;"></input>' + 
	'<button type="button" onclick="GenHexX();">Generate</button>';
$("div.box6").html(DrawForm);
};
function SaveMACS(){
	var userInput = $(".log2").text();
	var userInputA = userInput.replace("</br>", '\r\n');
	var userInputB = userInputA.replace("Clear List", '');
	download(userInputB, "mac.txt", "text/plain;charset=utf-8");
}
function ClearHex(){
	$("div.box6").html("");
}
function GenHex(count, options){
	var x = count;
	var modi = "";
	var textX = "";
	var y = options;
	switch (y) {
		case 0: modi = ""; break;
		case 1: modi = "-"; break;
		case 2: modi = ":"; break;
		case 3: modi = "."; break;
	}
    for (var i = 0; i < x; i++) {
        var num = HEX(2).toUpperCase() + modi + HEX(2).toUpperCase() + modi + HEX(2).toUpperCase() + modi + HEX(2).toUpperCase() + modi + HEX(2).toUpperCase() + modi + HEX(2).toUpperCase() + "\r\n";
		textX += String(num);
    }
    return textX;
};
function GenHexX(){
	var myItem2 = $("#dividerOpts").prop('selectedIndex');
	var myItem = $("#macopts").val();
	var myData = GenHex(myItem, myItem2);
	$("div.box6").html('<textarea class="log2" style="width: 200px; height: 140px">' + myData + '</textarea><button type="button" onclick="SaveMACS();">Save to File</button><button type="button" onclick="ClearHex();">Clear List</button>');
};
function UpdatePlaylist(MyPlaylistID){
	if (isNaN(myPlaylistID)) {
		myPlaylistID = 0; /*default playlist*/
	}
	localStorage.setItem("MyPlaylist", MyPlaylistID);
	menu(1);
};
const line = [];
function GenDailyBible(){
	var request = new XMLHttpRequest();
	request.onload = function() {
		var fileContent = this.responseText;
		var fileContentLines = fileContent.split( '\n' );
		var randomLineIndex = Math.floor( Math.random() * fileContentLines.length );
		line[0] = fileContentLines[ randomLineIndex ];
		//randomLineIndex = Math.floor( Math.random() * fileContentLines.length );
		line[1] = fileContentLines[ randomLineIndex + 1];
		//randomLineIndex = Math.floor( Math.random() * fileContentLines.length );
		line[2] = fileContentLines[ randomLineIndex + 2 ];
		//randomLineIndex = Math.floor( Math.random() * fileContentLines.length );
	    line[3] = fileContentLines[ randomLineIndex + 3];
		var x = line[0] + "</br>" + line[1] + "</br>" + line[2] + "</br>" + line[3]; //+ "<br/>" + line[1];
	
		localStorage.setItem("DailyBible", "<td align='center' style='color:yellow;width:100%;'>" + x + "</td>");
		//document.getElementById( 'random-phrase' ).innerHTML = randomLine;
};
request.open( 'GET', 'db/kjv.txt', true );
request.send();

var output = localStorage.getItem('DailyBible');
$("div.box6").html(output);
}
function SavePlaylist(){
	var myItem = $("#playlist").val();
	var myIndex = document.getElementById("playlist").selectedIndex;
	localStorage.setItem("MyPlaylist", myIndex);
	menu(1);
	$("div.box6").html("Saved playlist: " + myItem);
};
var TotalData;
var Tracks = [];
var TracksZ;

function GrabRandomTrackZ(PlaylistID){ /* grabs a random track and stores it locally as MyTrack */
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const myObj = JSON.parse(this.responseText);
			shuffle(myObj);
			var trackID;// = myObj[myIndex].videoid;
			const MaxCount = myObj.length;
			/* videoID | startTime | endTime */
			for (let i = 0; i < MaxCount; i++) {
				trackID = myObj[i].videoid;
				const X = trackID;
				Tracks[i] = X;
			  }
			  for (let i = 0; i < MaxCount; i++) {
				if (i == 0) {
					TracksZ = Tracks[i] + "|"
				} else if (i == MaxCount) {
					TracksZ = TracksZ + Tracks[i];
				} else {
					TracksZ = TracksZ + Tracks[i] + "|"
				}
			  }
			  var TotalData = TracksZ;
			localStorage.setItem("MyTrack", TotalData);
			UpdateVideoPlayerZ(PlaylistID);
		}
		
    }
	switch(PlaylistID) {
		case '0'||"0"||0:
			xmlhttp.open("GET", "db/music.json", true);
			xmlhttp.send();
			break;
		case '1'||"1"||1:
			xmlhttp.open("GET", "db/documentary.json", true);
			xmlhttp.send();
			break;
		case '2'||"2"||2:
			xmlhttp.open("GET", "db/mfdoom.json", true);
			xmlhttp.send();
			break;
		case '3'||"3"||3:
			xmlhttp.open("GET", "db/hiphop.json", true);
			xmlhttp.send();
			break;
		case '4'||"4"||4:
			xmlhttp.open("GET", "db/The_80s.json", true);
			xmlhttp.send();
			break;
		}
};

function GrabRandomTrack(PlaylistID){ /* grabs a random track and stores it locally as MyTrack */
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const myObj = JSON.parse(this.responseText);
			const myIndex = Math.floor((Math.random() * myObj.length - 1));
			/* videoID | startTime | endTime */
			var trackID = myObj[myIndex].videoid;
			var startTime = myObj[myIndex].startTime;
			var endTime = myObj[myIndex].endTime;
			
			var TotalData = trackID + "|" + startTime + "|" + endTime;
			console.log(TotalData);
			localStorage.setItem("MyTrack", TotalData);
			UpdateVideoPlayer();
		}
		
    }
	switch(PlaylistID) {
		case '0'||"0"||0:
			xmlhttp.open("GET", "db/music.json", true);
			xmlhttp.send();
			break;
		case '1'||"1"||1:
			xmlhttp.open("GET", "db/documentary.json", true);
			xmlhttp.send();
			break;
		case '2'||"2"||2:
			xmlhttp.open("GET", "db/mfdoom.json", true);
			xmlhttp.send();
			break;
		case '3'||"3"||3:
			xmlhttp.open("GET", "db/hiphop.json", true);
			xmlhttp.send();
			break;
		}
		
};

var videoID; var HDEmbed; var SDEmbed;

function AudioPlayerEmbed(){
	var Embed;
	Embed = '<iframe id="player" width="100%" height="480" src="./ap.html" frameborder="0"></iframe>' + 
		    '<br /><button type="button" onclick="CloseVideo();">Close Audio</button>';
	return Embed;
};
function YTEmbed(){
	var $_GET = {};
	if(document.location.toString().indexOf('?') !== -1) {
    var query = document.location
                   .toString()
                   .replace(/^.*?\?/, '')
                   .replace(/#.*$/, '')
                   .split('&');
    for(var i=0, l=query.length; i<l; i++) {
       var aux = query[i].split('='); $_GET[decodeURIComponent(aux[0])] = decodeURIComponent(aux[1]);
       $_GET[aux[0]] = aux[1];
    }
  }
let myID = $_GET['v'];
$.ajax({
 url: "https://www.googleapis.com/youtube/v3/videos?id="+myID+"&key=AIzaSyC2-eKIWkTVIqEv1_oDVyton78YCIH5uio&fields=items(snippet(title))&part=snippet",
 dataType: "jsonp",

 success: function (data) {let ytvtit = data.items[0].snippet.title;
 
 SDEmbed = '<label style="align-items:center;position:relative;">[Now Playing]: ' + ytvtit + '</label><iframe id="player" width="100%" height="720" src="https://www.youtube.com/embed/' + myID + '?playlist=' + myID + '&autoplay=1&loop=1&rel=0&wmode=transparent&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; loop" allowfullscreen></iframe>' + 
		'<br /><button type="button" onclick="CloseVideo2();">Close Video</button>';
$("div.box6").html(SDEmbed);
}
});
};

var myTitle;

function GrabTitle(videoID){
	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/videos?id="+videoID+"&key=AIzaSyC2-eKIWkTVIqEv1_oDVyton78YCIH5uio&fields=items(snippet(title))&part=snippet",
		dataType: "jsonp",
		success: function (data) {
			myTitle = data.items[0].snippet.title;
			$( "#np" ).html(String("[Now Playing]: " + myTitle));
		}} );
};
  function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}
function YouTubeEmbedZ(vidID){

	let str = vidID;
    const myData = str.split("|");
	const myCount = str.split("|").length-1
	var myEmbedData;
	for (let i = 0; i < myCount; i++) {
		if (i == 0) {
			myEmbedData = myData[i];
		} else {
			myEmbedData = myEmbedData + ',' + myData[i];
		}
	}
	const starterID = myData[0];
	const videoID = myEmbedData; // example: gpyRI1j9t6c
	var output = myPlaylistID; //localStorage.getItem("MyPlaylist");
	switch(output) {
		case '0':
			myTitle = "Default (Playlist)";
			break;
		case '1':
			myTitle = "Documentaries (Playlist)";
			break;	
		case '2':
			myTitle = "MF Doom (Playlist)";
			break;
		case '3':
			myTitle = "Hip-Hop (Playlist)";
			break;
		case '4':
			myTitle = "The 80's (Playlist)";
			break;
	};

//https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
SDEmbed = '<label id="np" style="align-items:center;position:relative;">[Now Playing]: ' + myTitle + '</label><iframe id="player" width="100%" height="720" src="https://www.youtube.com/embed/' + starterID + '?playlist=' + videoID + '&autoplay=1&loop=1&rel=0&origin=localhost&wmode=transparent&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; loop" allowfullscreen></iframe>' + 
'<br /><button type="button" onclick="CloseVideo();">Close Video</button><button type="button" onclick="menu(1);">Random Video</button><button type="button" onclick="UpdatePlaylist(1);">Random Documentary</button>';
	return SDEmbed;
};
/* videoID | startTime | endTime */
function YouTubeEmbed(vidID){
	let str = vidID;
    const myData = str.split("|");
	const videoID = myData[0]; // example: gpyRI1j9t6c
	var startTime = myData[1]; // example: 17 seconds (start time is in seconds) for ex: 120 (2 minutes)
	var endTime = myData[2];
	var Checker = isNaN(startTime);
	var Checker2 = isNaN(endTime);
//https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
	if (Checker) {
		//$( "#np" ).html(String("[Now Playing]: " + ytvtit)); /*our only way to update*/
			SDEmbed = '<label id="np" style="align-items:center;position:relative;">[Now Playing]: ' + '</label><iframe id="player" width="100%" height="720" src="https://www.youtube.com/embed/' + videoID + '?playlist=' + videoID + '&autoplay=1&loop=1&rel=0&wmode=transparent&origin=localhost&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; loop" allowfullscreen></iframe>' + 
			'<br /><button type="button" onclick="CloseVideo();">Close Video</button><button type="button" onclick="menu(1);">Random Video</button><button type="button" onclick="UpdatePlaylist(1);">Random Documentary</button>';
			//GrabTitle(videoID);
}
if (Checker2) {
			SDEmbed = '<label id="np" style="align-items:center;position:relative;">[Now Playing]: ' + '</label><iframe id="player" width="100%" height="720" src="https://www.youtube.com/embed/' + videoID + '?playlist=' + videoID + '&autoplay=1&loop=1&rel=0&origin=localhost&wmode=transparent&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; loop" allowfullscreen></iframe>' + 
			'<br /><button type="button" onclick="CloseVideo();">Close Video</button><button type="button" onclick="menu(1);">Random Video</button><button type="button" onclick="UpdatePlaylist(1);">Random Documentary</button>';
			//GrabTitle(videoID);
		}
else {
			SDEmbed = '<label id="np" style="align-items:center;position:relative;">[Now Playing]: ' + '</label><iframe id="player" width="100%" height="720" src="https://www.youtube.com/embed/' + videoID + '?playlist=' + videoID + '&start=' + startTime + '&end=' + endTime + '&origin=localhost&autoplay=1&loop=1&rel=0&wmode=transparent&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; loop" allowfullscreen></iframe>' +
			'<br /><button type="button" onclick="CloseVideo();">Close Video</button><button type="button" onclick="menu(1);">Random Video</button><button type="button" onclick="UpdatePlaylist(1);">Random Documentary</button>';
			//GrabTitle(videoID);
		}
		
	return SDEmbed;
};
var myPlaylistID;
function Yoink(){
	//var vid = songs[Math.floor((random() * songs.length))];
	myPlaylistID = localStorage.getItem('MyPlaylist');
	if (isNaN(myPlaylistID)) {
		localStorage.setItem('MyPlaylist', 0);
		myPlaylistID = 0;
	}
	
	GrabRandomTrackZ(myPlaylistID);
};
function UpdateVideoPlayerZ(){
	const myVid = localStorage.getItem('MyTrack');
	const str = myVid;
    const myData = str.split("|");
	//const videoID = myData[0]; // example: gpyRI1j9t6c
	$( "div.box2" ).html(YouTubeEmbedZ(myVid));
};
function UpdateVideoPlayer(){
	const myVid = localStorage.getItem('MyTrack');
	const str = myVid;
    const myData = str.split("|");
	const videoID = myData[0]; // example: gpyRI1j9t6c
	
	GrabTitle(videoID);
	$( "div.box2" ).html(YouTubeEmbed(myVid));
};
function RNG0 (min, max){ 
	var random = new Math.seedrandom();
	return Math.round(random() * (max - min) + min);
};
function ProcessEmbed(MyEmbed){
	$( "div.boxboy" ).html(String(YouTubeEmbed(MyEmbed + "|||test")));
};
function menu(menuItem){
	var random = new Math.seedrandom();
	switch (menuItem) {
		case 0: //eco bot
			$( "div.box" ).html("Ecosia Idle Search Bot<br />(this will open a popup & search random keywords)<br />it takes 45 searches for them to plant a tree.<br /><br /><button type='button' onclick='javascript:Start();javascript:myLoop();'>Start</button><button type='button' onclick='javascript:StopIt();javascript:CloseMe();'>Stop</button><button type='button' onclick='javascript:StopIt();javascript:CloseMe();javascript:CloseIdleBot();'>Close Bot</button><p id='mycnt'>Counter: 0</p>");
			break;
		case 1: //Play a random video
		myPlaylistID = localStorage.getItem('MyPlaylist');
		if (isNaN(myPlaylistID)) {
			myPlaylistID = '0';
			localStorage.setItem('MyPlaylist', myPlaylistID);
		}
			Yoink(); // we process the data.
			break;
		case 2: //thc calc
			$( "div.box3" ).html("<label>Enter THC%: </label><input type='text' id='thcperc' name='thcperc' value=''/><br /><button type='button' onclick='javascript:Calculate();'>Calculate</button> <button type='button' onclick='CloseTHC();'>Close Calculator</button><br />");
			break;
	    case 3: //psy
		    StopPSY();
			LoopIt();
		    break;
		case 4: //Playlist modifier
		    DrawListBox();
		    break;
		case 5: //presearch bot
		    $( "div.box" ).html("PreSearch.IO Idle Search Bot<br />(this will open a popup & search random keywords)<br />Just a proof of concept.<br /><br /><button type='button' onclick='javascript:Start2();javascript:myLoop2();'>Start</button><button type='button' onclick='javascript:StopIt2();javascript:CloseMe2();'>Stop</button><button type='button' onclick='javascript:StopIt2();javascript:CloseMe2();javascript:CloseIdleBot();'>Close Bot</button><p id='mycnt2'>Counter: 0</p>");
			break;
		case 6: //audio player (howler.js)
			$( "div.box2" ).html(String(AudioPlayerEmbed()));
			break;
		case 7: //searchscene bot
		    $( "div.box" ).html("SearchScene Idle Search Bot<br />(this will open a popup & search random keywords)<br /><button type='button' onclick='javascript:Start3();javascript:myLoop3();'>Start</button><button type='button' onclick='javascript:StopIt3();javascript:CloseMe3();'>Stop</button><button type='button' onclick='javascript:StopIt3();javascript:CloseMe3();javascript:CloseIdleBot();'>Close Bot</button><p id='mycnt3'>Counter: 0</p>");
			break;
		case 8: //mac address generator
		    DrawMACGen();
			break;
		case 9:
			testEM();
			break;
	}
};

function HDVideo(){
	$( 'div.box2' ).html(HDEmbed);
};
function SDVideo(){
	$( 'div.box2' ).html(SDEmbed);
};
function CloseVideo(){
	$( "div.box2" ).html("");
};
function CloseVideo2(){
	$("div.box6").html("");
};
function CloseTHC(){
	$( "div.box3" ).html("");
	$( "div.log" ).html("");
};

var psyLoop;

function StopPSY(){
	$( "div.box4" ).html("");
	clearInterval(psyLoop);
	clearInterval(LoopIt);
	clearInterval(startPsyMode);
};
function LoopIt(){
	var random = new Math.seedrandom();
	psyLoop = setInterval(startPsyMode, RNG0(400,1600));
};
function startPsyMode(){
	$( "div.box4" ).html("<style>html, td, body, label, li {background-position:auto;" +
	        "opacity: " + RNG0(100,420) + "%;" +
			"background-size: " + RNG0(3,19) + "%; background-repeat:repeat;background-blend-mode:normal;" +
			"background-image:url(./img/bg" + RNG0(1,20) + ".gif);</style><button type='button' onclick='StopPSY();'>Stop Visualizer</button>");
};
function CloseIdleBot(){
	$( "div.box" ).html("");
};