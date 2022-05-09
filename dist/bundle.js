/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./basicVoiceCall.js":
/*!***************************!*\
  !*** ./basicVoiceCall.js ***!
  \***************************/
/***/ (() => {

eval("/*jshint esversion: 8 */\r\n// import AgoraRTC from \"./node_modules/agora-rtc-sdk-ng/AgoraRTC_N-production.js\";\r\nvar rtc = {\r\n    // For the local audio and video tracks.\r\n    localAudioTrack: null,\r\n};\r\n\r\nvar options = {\r\n    // Pass your app ID here.\r\n    appId: \"84f7f5d549bb4a9cb1d5081b9f3b3c16\",\r\n    // Set the channel name.\r\n    channel: \"Dummy\",\r\n};\r\n\r\n// Fetch a token from the Golang server.\r\nfunction fetchToken(uid, channelName) {\r\n\r\n    return new Promise(function (resolve) {\r\n        axios.post('https://lit-fjord-25946.herokuapp.com/token', {\r\n            uid: uid,\r\n            channelName: channelName,\r\n        }, {\r\n            headers: {\r\n                'Content-Type': 'application/json; charset=UTF-8'\r\n            }\r\n        })\r\n            .then(function (response) {\r\n                const token = response.data.token;\r\n                resolve(token);\r\n            })\r\n            .catch(function (error) {\r\n                console.log(error);\r\n            });\r\n    });\r\n}\r\n\r\nasync function startBasicCall() {\r\n\r\n    const client = AgoraRTC.createClient({ mode: \"rtc\", codec: \"vp8\" });\r\n    const uid = Math.floor(Math.random() * (99 - 11) + 11);\r\n\r\n    // Fetch a token before calling join to join a channel.\r\n    let token = await fetchToken(uid, options.channel, 2);\r\n\r\n    await client.join(options.appId, options.channel, token, uid);\r\n    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();\r\n    await client.publish([rtc.localAudioTrack]);\r\n\r\n    console.log(\"publish success!\");\r\n\r\n    client.on(\"user-published\", async (user, mediaType) => {\r\n        console.log(\"user-published\", user.uid);\r\n        await client.subscribe(user, mediaType);\r\n        console.log(\"subscribe success\", user.uid);\r\n\r\n        if (mediaType === \"audio\") {\r\n            const remoteAudioTrack = user.audioTrack;\r\n            remoteAudioTrack.play();\r\n        }\r\n\r\n        client.on(\"user-unpublished\", user => {\r\n            console.log(\"user-unpublished\", user.uid);\r\n            const remotePlayerContainer = document.getElementById(user.uid);\r\n            remotePlayerContainer.remove();\r\n        });\r\n\r\n    });\r\n\r\n    // When token-privilege-will-expire occurs, fetch a new token from the server and call renewToken to renew the token.\r\n    client.on(\"token-privilege-will-expire\", async function () {\r\n        let token = await fetchToken(uid, options.channel, 1);\r\n        await client.renewToken(token);\r\n    });\r\n\r\n    // When token-privilege-did-expire occurs, fetch a new token from the server and call join to rejoin the channel.\r\n    client.on(\"token-privilege-did-expire\", async function () {\r\n        console.log(\"Fetching the new Token\");\r\n        let token = await fetchToken(uid, options.channel, 1);\r\n        console.log(\"Rejoining the channel with new Token\");\r\n        await rtc.client.join(options.appId, options.channel, token, uid);\r\n    });\r\n\r\n}\r\n\r\nstartBasicCall();\n\n//# sourceURL=webpack://agora_test/./basicVoiceCall.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./basicVoiceCall.js"]();
/******/ 	
/******/ })()
;