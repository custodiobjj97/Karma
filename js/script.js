// is function for active menu mobile

function initMenuMobile() {
    const toggle = document.querySelector('.toggle')
    
    function activeToggle(event) {
        if (event.type === 'touchstart') {
            event.preventDefault()
        }

        const menu = document.querySelector('.list-menu')
        menu.classList.toggle('active')
    }

    toggle.addEventListener('click', activeToggle)
    toggle.addEventListener('touchstart',activeToggle)
}

initMenuMobile()

//is function of slider touch

function initsliderTouch() {
    const slider = document.querySelector('.slider-container')
    const slides = Array.from(document.querySelectorAll('.slide'))
    const btnsNext = document.querySelectorAll('.slide .btn')
    
    
    let isDragging = false 
    let startPos = 0
    let currentTranslate = 0
    let prevTranslate = 0
    let animationID = 0
    let currentIndex = 0

    slides.forEach((slide, index) => {
        const slideImg = slide.querySelector('img')
        slideImg.addEventListener('dragstart', (e) => e.preventDefault())
        
        slide.addEventListener('touchstart', touchStart(index))
        slide.addEventListener('touchend', touchEnd)
        slide.addEventListener('touchmove', touchMove)
        
        slide.addEventListener('mousedown', touchStart(index))
        slide.addEventListener('mouseup', touchEnd)
        slide.addEventListener('mouseleave', touchEnd)
        slide.addEventListener('mousemove', touchMove)
    })
    btnsNext.forEach((btn) => {
        btn.addEventListener('click', sliderNext)
        
    })
    window.oncontextmenu = function (event) {
        event.preventDefault()
        event.stopPropagation()
        return false
    }

    function touchStart(index) {
        return function (event) {
            currentIndex = index 
            startPos = getPositionX(event)
            isDragging = true
            animationID = requestAnimationFrame(animation)
            slider.classList.add('grabbing')
        }
    }

    function touchEnd() {
        isDragging = false 
        cancelAnimationFrame(animationID)

        const movedBy = currentTranslate - prevTranslate
        
        if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1
        
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1
        
        setSliderPositionByIndex()

        slider.classList.remove('grabbing')
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event)
            currentTranslate= prevTranslate + currentPosition - startPos
        }
    }

    function sliderNext() {
        currentIndex = (currentIndex + 1) % slides.length
        setSliderPositionByIndex()
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
    }

    function setSliderPosition() {
        slider.style.transform=`translateX(${currentTranslate}px)`
    }
    function animation() {
        setSliderPosition()
        if(isDragging)  requestAnimationFrame(animation)
    }

    function setSliderPositionByIndex() {
        currentTranslate = currentIndex * -window.innerWidth
        prevTranslate = currentTranslate
        setSliderPosition()
    }
}

initsliderTouch()


// is function for scroll animation

function initScrollAnimation() {
    const sectionElement = document.querySelectorAll('.js-scroll')
    const haftHeight = window.innerHeight *0.5
    function scrollAnimation() {
        sectionElement.forEach((section) => {
            const elementTop = section.getBoundingClientRect().top
            const isSectionVisible = (elementTop - haftHeight) < 0
            if (isSectionVisible) {
                section.classList.add('show')
            } else {
                section.classList.remove('show')
            }
        })
    }
    scrollAnimation()
    window.addEventListener('scroll', scrollAnimation)
    
}

initScrollAnimation()

// is function for slide shop
function sliderShop() {
    const slider = document.querySelector('.container')
    const cards = document.querySelector('.cards')

    let isPressed = false;

    let cursorX;

    function touchStart(e) {
        isPressed = true;
        cursorX = e.offsetX - cards.offsetLeft;
        slider.style.cursor = "grabbing";
    }

    function touchUp() {
        slider.style.cursor = "grab";
    }

    function windowUp() {
        isPressed = false;
    }

    function touchMove(e) {
        if (!isPressed) return;
        e.preventDefault();
        cards.style.left = `${e.offsetX - cursorX}px`;
        boundSlides();
    }

    function boundSlides() {
        const containerRect = slider.getBoundingClientRect();
        const cardsRect = cards.getBoundingClientRect();
        console.log(cardsRect)
        if (parseInt(cards.style.left) > 0) {
            cards.style.left = 0;
        } else if (cardsRect.right < containerRect.right) {
            cards.style.left = `-${cardsRect.width - containerRect.width}px`;
        }
    }

    slider.addEventListener("mousedown",touchStart);

    slider.addEventListener("mouseup",touchUp);

    window.addEventListener("mouseup",windowUp);

    slider.addEventListener("mousemove",touchMove);
    

    slider.addEventListener("touchstart", touchStart);

    slider.addEventListener("touchup", touchUp);
    slider.addEventListener("touchleave", touchUp);
    slider.addEventListener("touchmove", touchMove);


    
}

sliderShop()