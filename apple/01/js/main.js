(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화 된(눈 앞에 보고 있는) 씬(scroll_section)
    let enterNewScene = false; // 새로운 씬이 시작된 순간 true

    const sceneInfo = [
        {
            //0
            type : 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll_section_0'),
                messageA: document.querySelector('#scroll_section_0 .main_message.a'),
                messageB: document.querySelector('#scroll_section_0 .main_message.b'),
                messageC: document.querySelector('#scroll_section_0 .main_message.c'),
                messageD: document.querySelector('#scroll_section_0 .main_message.d'),
                canvas: document.querySelector('#video_canvas_0'),
				context: document.querySelector('#video_canvas_0').getContext('2d'),
				videoImages: []
            },

            values: {
                videoImageCount: 300,
				imageSequence: [0, 299],
				canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
				messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
				messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
				messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
				messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
				messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
				messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
				messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
				messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
				messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
				messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
				messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
				messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            }
        },

        {
            //1
            type: 'normal',
            heightNum: 5,  // 노말타입에선 필요없음
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll_section_1'),
                content: document.querySelector('#scroll_section_1 .description')
            }
        },

        {
            //2
            type : 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll_section_2'),
                messageA: document.querySelector('#scroll_section_2 .a'),
                messageB: document.querySelector('#scroll_section_2 .b'),
                messageC: document.querySelector('#scroll_section_2 .c'),
                pinB: document.querySelector('#scroll_section_2 .b .pin'),
                pinC: document.querySelector('#scroll_section_2 .c .pin'),
                canvas: document.querySelector('#video_canvas_1'),
			       context: document.querySelector('#video_canvas_1').getContext('2d'),
				   videoImages: []
            },
            values: {
                videoImageCount: 960,
				imageSequence: [0, 959],
				canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
				canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
				messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
				messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
				messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
				messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
				messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
				messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
				messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
				messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
				messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
				messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
				messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
				messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
				pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
				pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
            }
        },

        {
            //3
            type : 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll_section_3'),
				canvasCaption: document.querySelector('.canvas_caption'),
				canvas: document.querySelector('.image_blend_canvas'),
				context: document.querySelector('.image_blend_canvas').getContext('2d'),
				imagesPath: [
					'./images/blend-image-1.jpg',
					'./images/blend-image-2.jpg'
				],
				images: [],
            },
            values: {
                rect1X: [ 0, 0, { start: 0, end: 0 } ],
				rect2X: [ 0, 0, { start: 0, end: 0 } ],
				blendHeight: [ 0, 0, { start: 0, end: 0 } ],
				canvas_scale: [ 0, 0, { start: 0, end: 0 } ],
				canvasCaption_opacity: [ 0, 1, { start: 0, end: 0 } ],
				canvasCaption_translateY: [ 20, 0, { start: 0, end: 0 } ],
				rectStartY: 0,

                	// index2 추가 코드
				messageA_opacity_in: [0, 1, { start: 0, end: 0 }],
				messageA_opacity_out: [1, 0, { start: 0, end: 0 }]
            }
        }
    ];


    function setCanvasImages() {
		let imgElem;
		for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
			imgElem = new Image();
			imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
			sceneInfo[0].objs.videoImages.push(imgElem);
		}

		let imgElem2;
		for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
			imgElem2 = new Image();
			imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
			sceneInfo[2].objs.videoImages.push(imgElem2);
		}

		let imgElem3;
		for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
			imgElem3 = new Image();
			imgElem3.src = sceneInfo[3].objs.imagesPath[i];
			sceneInfo[3].objs.images.push(imgElem3);
		}
	}
    setCanvasImages();

	function checkMenu() {
		if (yOffset > 44) {
			document.body.classList.add('local_nav_sticky');
		} else {
			document.body.classList.remove('local_nav_sticky');
		}
	}

    function setLayout() {
        //각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
                sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
            }else if (sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }   

        yOffset = window.pageYOffset;

        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show_scene_${currentScene}`);

        const heightRatio = window.innerHeight / 1080;
		sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
		sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    function calcValues(values, currentYOffset) {
		
		let rv;
		// 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;
        
		if (values.length === 3) {
			// start ~ end 사이에 애니메이션 실행
			const partScrollStart = values[2].start * scrollHeight;
			const partScrollEnd = values[2].end * scrollHeight;
			const partScrollHeight = partScrollEnd - partScrollStart;

			if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			} else if (currentYOffset < partScrollStart) {
				rv = values[0];
			} else if (currentYOffset > partScrollEnd) {
				rv = values[1];
			}
		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0];
		}

		return rv;
	}


    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;

        switch (currentScene) {
            case 0:
                // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
				// objs.context.drawImage(objs.videoImages[sequence], 0, 0);
				objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
                if (scrollRatio <= 0.22) {
                    //in
                    objs.messageA.style.opacity =calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translateY(${ calcValues(values.messageA_translateY_in, currentYOffset)})`;
                } else {
                    //out
                    objs.messageA.style.opacity =  calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)})`;
                }

                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
                
                break;

            case 2:
                //  console.log('2 play');
                // let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
				// objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

               if (scrollRatio <= 0.32) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
               } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.67) {
                    // in
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }

                if (scrollRatio <= 0.93) {
                    // in
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
                break;

            case 3:

                let step = 0;
                const widthRatio = window.innerWidth / objs.canvas.width;
				const heightRatio = window.innerHeight / objs.canvas.height;
				let canvasScaleRatio;

                if (widthRatio <= heightRatio) {
					// 캔버스보다 브라우저 창이 홀쭉한 경우
					canvasScaleRatio = heightRatio;
				} else {
					// 캔버스보다 브라우저 창이 납작한 경우
					canvasScaleRatio = widthRatio;
				}

                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
				objs.context.fillStyle = 'white';
				objs.context.drawImage(objs.images[0], 0, 0);


				캔버스 사이즈에 맞춰 가정한 innerwidth와 innerHeight
				const recalculatedInnerWidth = window.innerHeight / canvasScaleRatio;
				const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

                break;
        }
    }
    
    
    
    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        
        // console.log('yOffset :', yOffset);
        // console.log('prevScrollHeight :', prevScrollHeight);
        // console.log('sceneInfo[currentScene]: ', sceneInfo[currentScene]);

        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;  // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }
		console.log(sceneInfo[currentScene].scrollHeight);
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show_scene_${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) return; // 브라운저 바운스 효과로 인해 -값이 되는걸 방지
            currentScene--;
            document.body.setAttribute('id', `show_scene_${currentScene}`);
        }

        if (enterNewScene) return; 

        playAnimation();
    }


    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    // winwdow.addEventListener('DomContentLoaded', setLayout);
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);


    
})();