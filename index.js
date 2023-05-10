const timeline = document.querySelector('.eae-timeline');
const fixedLine = document.querySelector('.eae-timline-progress-bar');

const setLineWidth = () => {
    const timelineItem = document.querySelectorAll('.eae-timeline-item');
    const firstItemHeight = timelineItem[0].offsetHeight;
    const lastItemHeight = timelineItem[timelineItem.length - 1].offsetHeight;
    const itemPadding = window.getComputedStyle(timelineItem[0], null).getPropertyValue('padding-bottom');
    fixedLine.style.height = `${timeline.offsetHeight - firstItemHeight / 2 - lastItemHeight / 2}px`;
    fixedLine.style.top = `${firstItemHeight / 2 - parseInt(itemPadding) / 2}px`;
};

const setPosition = () => {
    const iconWidth = document.querySelectorAll('.eae-tl-icon-wrapper')[0].getBoundingClientRect().width;
    if (window.innerWidth <= 767) {
        fixedLine.style.left = `${iconWidth / 2}px`;
        fixedLine.style.transform = 'translate(0)';
    }
    if (window.innerWidth > 767) {
        fixedLine.style.left = '50%';
        fixedLine.style.transform = 'translate(-50%, 0)';
    }
};

const setProgress = () => {
    const lineProgress = document.querySelector('.eae-pb-inner-line');
    let maxLineHeight = fixedLine.offsetHeight;
    window.addEventListener('resize', () => {
        setLineWidth();
        setPosition();
        maxLineHeight = fixedLine.offsetHeight;
    });
    window.addEventListener('scroll', () => {
        let timelineOffset = timeline.offsetParent.offsetTop + timeline.offsetTop - 200;
        console.log('scroll: ' + window.scrollY);
        console.log('offset: ' + timelineOffset);
        if (window.scrollY <= timelineOffset) {
            lineProgress.style.height = '0px';
        }
        if (window.scrollY >= timelineOffset) {
            let lineHeight = window.scrollY - timelineOffset;
            lineHeight > maxLineHeight
                ? lineProgress.style.height = `${maxLineHeight}px`
                : lineProgress.style.height = `${lineHeight}px`;
        }
    });
};

window.addEventListener('load', function () {
    setLineWidth();
    setProgress();
    setPosition();
})
