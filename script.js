// ARRAY
const arr = [
  {
    id: 0,
    question: "How long does the battery last fully charged?",
    answer: "The MagicMassage™ can last up to 6 hours when it's fully charged.",
  },
  {
    id: 1,
    question: "Can I use it in the shower?",
    answer: "There are many variations of passages of Lorem Ipsum available.",
  },
  {
    id: 2,
    question: "What is included in the package",
    answer:
      "The generated Lorem Ipsum is therefore always free from repetition",
  },
  {
    id: 3,
    question: "Is the MagicMassage™ designed only for the head?",
    answer: "The standard chunk of Lorem Ipsum used since the 1500s is.",
  },
];

// VARIABLES CAROUSEL
const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll(".happy_users")[0];
nextPrevIcons = document.querySelectorAll(".prev_next");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

// CAROUSEL THINGS
nextPrevIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 13; // getting first item width
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
  });
});

const dragStart = (e) => {
  // updateing variable on mouse movement
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

// ========================================
// VARIABLES
const FAQ = document.querySelector(".FAQ");
const showAll = document.querySelector(".show_more2");
const noMoreQuestions = document.querySelector(".no_more");
const loader = document.querySelector(".loading");
// SHOW ALL QUESTIONS FUNCTION

// FUNCTION FOR LOAD QUESTIONS AND ANSWERS
function loadFAQ(ques) {
  FAQ.innerHTML = "";
  ques.forEach((elem) => {
    let row = `
           <div class="showmore_tab">
            <div class="ques_tab">
              <h2>${elem.question}</h2>
              <div class="show_more"></div>
            </div>
            <div class="answ_tab">
              <p>
                ${elem.answer}
              </p>
            </div>
          </div>
          `;

    FAQ.innerHTML += row;
  });
  console.log("load questions");
}
// CALLING FUNCTION
loadFAQ(arr.slice(0, 4));
// VARIABLES
const quesTab = document.querySelectorAll(".showmore_tab");
const answTab = document.querySelectorAll(".answ_tab");
const showMore = document.querySelectorAll(".show_more");
const test = document.querySelector(".see_all");

// LOOP FOR DETECT AND CLICK EXACT ITEM
for (let i = 0; i < showMore.length; i++) {
  showMore[i].addEventListener("click", function () {
    quesTab[i].classList.toggle("active");
    answTab[i].classList.toggle("active");
    showMore[i].classList.toggle("active");
    console.log("show more");
  });
}

// LOAD ALL QUESTIONS IF IT HAS
showAll.addEventListener("click", function () {
  showAll.classList.toggle("active"); // toggle showAll icon

  if (showAll.classList.contains("active")) {
    loader.classList.add("active"); // SHOW LOADER
    showAll.style.display = "none"; // HIDE ICON
    //
    if (arr.length > 4) {
      setTimeout(function () {
        loader.classList.remove("active"), (showAll.style.display = "flex");
        // IF WE HAVE OTHER ITEMS IN ARRAY RENDER THEM ALL USEING FUNCTION;
        // loadFAQ(arr);
      }, 2000);
      console.log("load more");
    } else {
      setTimeout(function () {
        loader.classList.remove("active"),
          (showAll.style.display = "flex"),
          noMoreQuestions.classList.add("active");
      }, 2000);
    }
  } else {
    noMoreQuestions.classList.remove("active");
    // loadFAQ(arr.slice(0, 4));
  }
});
