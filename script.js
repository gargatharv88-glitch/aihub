/* =========================================
   AIHUB V1 JAVASCRIPT
   ========================================= */


/* =========================================
   BASIC ELEMENTS
   ========================================= */

const toolGrid = document.getElementById("toolGrid");
const toolSearch = document.getElementById("toolSearch");
const heroSearch = document.getElementById("heroSearch");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const toolCards =
    document.querySelectorAll(".tool-card");

const workspace =
    document.getElementById("workspace");

const workspaceTitle =
    document.getElementById("workspaceTitle");

const workspaceDescription =
    document.getElementById("workspaceDescription");

const workspaceCategory =
    document.getElementById("workspaceCategory");

const workspaceIcon =
    document.getElementById("workspaceIcon");

const toolInterface =
    document.getElementById("toolInterface");

const toast =
    document.getElementById("toast");


/* =========================================
   THEME
   ========================================= */

const themeBtn =
    document.getElementById("themeBtn");

const savedTheme =
    localStorage.getItem("aihub-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "aihub-theme",
        dark ? "dark" : "light"
    );

    themeBtn.textContent =
        dark ? "☀️" : "🌙";

});


/* =========================================
   MOBILE MENU
   ========================================= */

const menuBtn =
    document.getElementById("menuBtn");

const mainNav =
    document.getElementById("mainNav");


menuBtn.addEventListener("click", () => {

    mainNav.classList.toggle("open");

});


document.querySelectorAll("#mainNav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

        });

    });


/* =========================================
   TOAST
   ========================================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================
   COPY
   ========================================= */

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(text);

        showToast("Copied to clipboard!");

    } catch {

        showToast(
            "Copy failed — select the text manually."
        );

    }

}


/* =========================================
   TOOL SEARCH
   ========================================= */

function filterTools() {

    const query =
        toolSearch.value
            .toLowerCase()
            .trim();

    const activeCategory =
        document.querySelector(
            ".category-btn.active"
        ).dataset.category;

    let visible = 0;


    toolCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const category =
            card.dataset.category;

        const matchesSearch =
            name.includes(query);

        const matchesCategory =
            activeCategory === "all" ||
            category === activeCategory;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.style.display = "flex";

            visible++;

        } else {

            card.style.display = "none";

        }

    });


    document.getElementById("noTools")
        .style.display =
            visible === 0
                ? "block"
                : "none";

}


toolSearch.addEventListener(
    "input",
    filterTools
);


heroSearch.addEventListener(
    "input",
    () => {

        toolSearch.value =
            heroSearch.value;

        document
            .getElementById("tools")
            .scrollIntoView({
                behavior: "smooth"
            });

        filterTools();

    }
);


/* =========================================
   CATEGORY FILTER
   ========================================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        filterTools();

    });

});


/* =========================================
   TOOL DATA
   ========================================= */

const toolData = {

    prompt: {

        title: "AI Prompt Builder",

        category: "CONTENT",

        icon: "🧠",

        description:
            "Create structured prompts that are easier for AI assistants to understand.",

        interface: promptTool

    },


    "youtube-title": {

        title: "YouTube Title Generator",

        category: "YOUTUBE",

        icon: "▶️",

        description:
            "Generate multiple title ideas from a simple video topic.",

        interface: youtubeTitleTool

    },


    "content-ideas": {

        title: "Content Idea Generator",

        category: "CONTENT",

        icon: "💡",

        description:
            "Generate practical content ideas for videos, posts and blogs.",

        interface: contentIdeasTool

    },


    "youtube-description": {

        title: "YouTube Description Generator",

        category: "YOUTUBE",

        icon: "📝",

        description:
            "Create a clean YouTube description template.",

        interface: youtubeDescriptionTool

    },


    thumbnail: {

        title: "Thumbnail Prompt Generator",

        category: "YOUTUBE",

        icon: "🎨",

        description:
            "Generate detailed prompts for creating YouTube thumbnails.",

        interface: thumbnailTool

    },


    quiz: {

        title: "Quiz Generator",

        category: "STUDY",

        icon: "❓",

        description:
            "Create practice questions from any topic.",

        interface: quizTool

    },


    word: {

        title: "Word Counter",

        category: "TEXT",

        icon: "🔢",

        description:
            "Count words, characters, sentences and reading time.",

        interface: wordTool

    },


    formatter: {

        title: "Text Formatter",

        category: "TEXT",

        icon: "✨",

        description:
            "Transform text using common formatting options.",

        interface: formatterTool

    },


    characters: {

        title: "Character Counter",

        category: "TEXT",

        icon: "🔤",

        description:
            "Count characters with or without spaces.",

        interface: characterTool

    },


    case: {

        title: "Case Converter",

        category: "TEXT",

        icon: "Aa",

        description:
            "Convert text into different letter cases.",

        interface: caseTool

    },


    sentences: {

        title: "Sentence Counter",

        category: "TEXT",

        icon: "📄",

        description:
            "Count the number of sentences in your text.",

        interface: sentenceTool

    },


    reading: {

        title: "Reading Time Calculator",

        category: "TEXT",

        icon: "⏱️",

        description:
            "Estimate the reading time of your content.",

        interface: readingTool

    },


    tags: {

        title: "YouTube Tag Generator",

        category: "YOUTUBE",

        icon: "🏷️",

        description:
            "Create relevant tag suggestions from your topic.",

        interface: tagTool

    },


    hashtags: {

        title: "Hashtag Generator",

        category: "CONTENT",

        icon: "#️⃣",

        description:
            "Generate useful social media hashtag ideas.",

        interface: hashtagTool

    },


    cleaner: {

        title: "Text Cleaner",

        category: "TEXT",

        icon: "🧹",

        description:
            "Clean unnecessary spaces and blank lines.",

        interface: cleanerTool

    },


    bio: {

        title: "Bio Generator",

        category: "CONTENT",

        icon: "👤",

        description:
            "Create simple social media bio ideas.",

        interface: bioTool

    }

};


/* =========================================
   OPEN TOOL
   ========================================= */

document.querySelectorAll(".tool-open")
    .forEach(button => {

        button.addEventListener("click", () => {

            openTool(
                button.dataset.tool
            );

        });

    });


function openTool(toolName) {

    const tool =
        toolData[toolName];

    if (!tool) return;


    workspaceTitle.textContent =
        tool.title;

    workspaceDescription.textContent =
        tool.description;

    workspaceCategory.textContent =
        tool.category;

    workspaceIcon.textContent =
        tool.icon;


    toolInterface.innerHTML =
        tool.interface();


    workspace.classList.remove("hidden");


    workspace.scrollIntoView({
        behavior: "smooth"
    });


    activateCurrentTool(toolName);

}


/* =========================================
   CLOSE WORKSPACE
   ========================================= */

document.getElementById(
    "closeWorkspace"
).addEventListener("click", () => {

    workspace.classList.add("hidden");

    document.getElementById("tools")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =========================================
   GENERIC INTERFACE
   ========================================= */

function standardForm(fields, buttonText) {

    return `
        <div class="tool-form">

            ${fields}

            <button
                class="generate-btn"
                id="runTool">
                ${buttonText}
            </button>

            <div class="output-box">

                <div class="output-header">

                    <strong>Result</strong>

                    <button
                        class="copy-btn"
                        id="copyResult">
                        Copy
                    </button>

                </div>

                <div
                    class="output-content"
                    id="result">
                    Your result will appear here.
                </div>

            </div>

        </div>
    `;

}


/* =========================================
   1. PROMPT BUILDER
   ========================================= */

function promptTool() {

    return standardForm(`

        <div class="form-group">

            <label>What do you want AI to do?</label>

            <input
                id="promptTask"
                placeholder="Make a YouTube video about space for kids">

        </div>


        <div class="form-row">

            <div class="form-group">

                <label>Target audience</label>

                <input
                    id="promptAudience"
                    placeholder="Kids 2-8">

            </div>


            <div class="form-group">

                <label>Tone</label>

                <input
                    id="promptTone"
                    placeholder="Friendly">

            </div>

        </div>


        <div class="form-group">

            <label>Extra requirements</label>

            <textarea
                id="promptRequirements"
                placeholder="Keep it simple and engaging..."></textarea>

        </div>

    `, "Build Prompt");

}


function activatePrompt() {

    document.getElementById(
        "runTool"
    ).addEventListener("click", () => {

        const task =
            document.getElementById(
                "promptTask"
            ).value.trim();

        const audience =
            document.getElementById(
                "promptAudience"
            ).value.trim();

        const tone =
            document.getElementById(
                "promptTone"
            ).value.trim();

        const requirements =
            document.getElementById(
                "promptRequirements"
            ).value.trim();


        const result = `Act as an expert assistant.

Task:
${task || "Complete the requested task"}

Target audience:
${audience || "General audience"}

Tone:
${tone || "Clear and helpful"}

Requirements:
- Give a clear and useful answer.
- Organize the response with headings where helpful.
- Include practical examples when appropriate.
- Avoid unnecessary information.
- Make the final response easy to use.
${requirements ? "- " + requirements : ""}`;


        setResult(result);

    });

}


/* =========================================
   2. YOUTUBE TITLE
   ========================================= */

function youtubeTitleTool() {

    return standardForm(`

        <div class="form-group">

            <label>Video topic</label>

            <input
                id="titleTopic"
                placeholder="Space facts for kids">

        </div>


        <div class="form-group">

            <label>Style</label>

            <select id="titleStyle">

                <option>Curiosity</option>
                <option>Educational</option>
                <option>Fun</option>
                <option>Short & Punchy</option>

            </select>

        </div>

    `, "Generate Titles");

}


function activateYoutubeTitle() {

    document.getElementById(
        "runTool"
    ).addEventListener("click", () => {

        const topic =
            getValue("titleTopic") ||
            "Your Topic";

        const style =
            getValue("titleStyle");


        const titles = {

            "Curiosity": [
                `You Won't Believe These Facts About ${topic}`,
                `What Nobody Tells You About ${topic}`,
                `7 Amazing Things About ${topic}`,
                `How Much Do You Really Know About ${topic}?`,
                `The Truth About ${topic}`
            ],

            "Educational": [
                `${topic}: Complete Guide`,
                `${topic} Explained Simply`,
                `Learn ${topic} in Minutes`,
                `Everything You Need to Know About ${topic}`,
                `${topic} Facts Everyone Should Know`
            ],

            "Fun": [
                `${topic} Is WAY More Fun Than You Think!`,
                `Let's Explore ${topic}! 🚀`,
                `The Funniest Facts About ${topic}`,
                `${topic} Adventure Begins!`,
                `You Need to See This ${topic} Video!`
            ],

            "Short & Punchy": [
                `${topic} in 60 Seconds`,
                `${topic} Explained Fast`,
                `${topic} — WOW!`,
                `${topic} Made Easy`,
                `Quick ${topic} Facts`

            ]

        };


        setResult(
            titles[style].join("\n\n")
        );

    });

}


/* =========================================
   3. CONTENT IDEAS
   ========================================= */

function contentIdeasTool() {

    return standardForm(`

        <div class="form-group">

            <label>Topic or niche</label>

            <input
                id="ideaTopic"
                placeholder="Technology">

        </div>


        <div class="form-group">

            <label>Platform</label>

            <select id="ideaPlatform">

                <option>YouTube</option>
                <option>Instagram</option>
                <option>Blog</option>
                <option>General</option>

            </select>

        </div>

    `, "Generate Ideas");

}


function activateContentIdeas() {

    document.getElementById(
        "runTool"
    ).addEventListener("click", () => {

        const topic =
            getValue("ideaTopic") ||
            "Technology";

        const platform =
            getValue("ideaPlatform");


        const ideas = [

            `10 things beginners should know about ${topic}`,

            `The biggest mistakes people make with ${topic}`,

            `A beginner's guide to ${topic}`,

            `5 surprising facts about ${topic}`,

            `Myths vs facts: ${topic}`,

            `How to get better at ${topic}`,

            `Common questions about ${topic}`,

            `Beginner vs expert: ${topic}`,

            `The future of ${topic}`,

            `A simple challenge involving ${topic}`

        ];


        setResult(
            `Platform: ${platform}\n\n` +
            ideas
                .map(
                    (idea, index) =>
                        `${index + 1}. ${idea}`
                )
                .join("\n")
        );

    });

}


/* =========================================
   4. YOUTUBE DESCRIPTION
   ========================================= */

function youtubeDescriptionTool() {

    return standardForm(`

        <div class="form-group">

            <label>Video title</label>

            <input
                id="descriptionTitle"
                placeholder="Amazing Space Facts for Kids">

        </div>


        <div class="form-group">

            <label>Main video topic</label>

            <textarea
                id="descriptionTopic"
                placeholder="Explain what the video is about..."></textarea>

        </div>

    `, "Generate Description");

}


function activateYoutubeDescription() {

    document.getElementById(
        "runTool"
    ).addEventListener("click", () => {

        const title =
            getValue("descriptionTitle") ||
            "My New Video";

        const topic =
            getValue("descriptionTopic") ||
            "In this video we explore an interesting topic.";


        const description = `${topic}

In this video:
• Easy-to-understand explanations
• Interesting facts
• Helpful examples
• Simple and engaging information

If you enjoyed the video, consider subscribing for more useful content.

#YouTube #Content #Education`;


        setResult(
            `TITLE:\n${title}\n\n${description}`
        );

    });

}


/* =========================================
   5. THUMBNAIL PROMPT
   ========================================= */

function thumbnailTool() {

    return standardForm(`

        <div class="form-group">

            <label>Video topic</label>

            <input
                id="thumbnailTopic"
                placeholder="Space adventure for kids">

        </div>


        <div class="form-group">

            <label>Visual style</label>

            <select id="thumbnailStyle">

                <option>3D Cartoon</option>
                <option>Realistic</option>
                <option>Modern</option>
                <option>Educational</option>

            </select>

        </div>

    `, "Create Thumbnail Prompt");

}


function activateThumbnail() {

    document.getElementById(
        "runTool"
    ).addEventListener("click", () => {

        const topic =
            getValue("thumbnailTopic") ||
            "Amazing Topic";

        const style =
            getValue("thumbnailStyle");


        setResult(
`Create a high-quality YouTube thumbnail about "${topic}".

Style:
${style}

Requirements:
- Strong central subject
- Bright visual contrast
- Clear focal point
- Exciting composition
- Professional YouTube thumbnail layout
- Leave clean space for large readable text
- High detail
- 16:9 composition
- Eye-catching but not cluttered
- Suitable for a broad audience`
        );

    });

}


/* =========================================
   6. QUIZ
   ========================================= */

function quizTool() {

    return standardForm(`

        <div class="form-group">

            <label>Quiz topic</label>

            <input
                id="quizTopic"
                placeholder="Solar System">

        </div>


        <div class="form-group">

            <label>Number of questions</label>

            <select id="quizNumber">

                <option>5</option>
                <option>10</option>

            </select>

        </div>

    `, "Generate Quiz");

}


function activateQuiz() {

    document.getElementById(
        "runTool"
    ).addEventListener("click", () => {

        const topic =
            getValue("quizTopic") ||
            "General Knowledge";

        const number =
            getValue("quizNumber");


        const questions = [];

        for (
            let i = 1;
            i <= Number(number);
            i++
        ) {

            questions.push(
`${i}. What is one important fact about ${topic}?

A) Option A
B) Option B
C) Option C
D) Option D

Answer: ______`
            );

        }


        setResult(
            `QUIZ: ${topic}\n\n` +
            questions.join("\n\n")
        );

    });

}


/* =========================================
   7. WORD COUNTER
   ========================================= */

function wordTool() {

    return `

        <div class="tool-form">

            <div class="form-group">

                <label>Enter your text</label>

                <textarea
                    id="wordText"
                    placeholder="Type or paste your text here..."></textarea>

            </div>


            <div class="live-stats">

                <div class="stat-box">
                    <strong id="wordCount">0</strong>
                    <span>Words</span>
                </div>

                <div class="stat-box">
                    <strong id="charCount">0</strong>
                    <span>Characters</span>
                </div>

                <div class="stat-box">
                    <strong id="sentenceCount">0</strong>
                    <span>Sentences</span>
                </div>

                <div class="stat-box">
                    <strong id="readingCount">0 min</strong>
                    <span>Reading Time</span>
                </div>

            </div>

        </div>

    `;

}


function activateWord() {

    const textarea =
        document.getElementById(
            "wordText"
        );


    textarea.addEventListener(
        "input",
        () => {

            const text =
                textarea.value.trim();

            const words =
                text
                    ? text.split(/\s+/).length
                    : 0;

            const chars =
                textarea.value.length;

            const sentences =
                text
                    ? (
                        text.match(
                            /[.!?]+/g
                        ) || []
                    ).length
                    : 0;

            const minutes =
                Math.max(
                    1,
                    Math.ceil(
                        words / 200
                    )
                );


            document.getElementById(
                "wordCount"
            ).textContent = words;

            document.getElementById(
                "charCount"
            ).textContent = chars;

            document.getElementById(
                "sentenceCount"
            ).textContent = sentences;

            document.getElementById(
                "readingCount"
            ).textContent =
                text ? `${minutes} min` : "0 min";

        }
    );

}


/* =========================================
   8. FORMATTER
   ========================================= */

function formatterTool() {

    return `

        <div class="tool-form">

            <div class="form-group">

                <label>Text</label>

                <textarea
                    id="formatterText"
                    placeholder="Enter text..."></textarea>

            </div>


            <div class="form-row">

                <button
                    class="generate-btn"
                    id="upperBtn">
                    UPPERCASE
                </button>

                <button
                    class="generate-btn"
                    id="lowerBtn">
                    lowercase
                </button>

            </div>


            <div class="output-box">

                <div class="output-header">

                    <strong>Formatted text</strong>

                    <button
                        class="copy-btn"
                        id="copyResult">
                        Copy
                    </button>

                </div>

                <div
                    class="output-content"
                    id="result">
                    Your formatted text will appear here.
                </div>

            </div>

        </div>

    `;

}


function activateFormatter() {

    const text =
        document.getElementById(
            "formatterText"
        );


    document.getElementById(
        "upperBtn"
    ).addEventListener("click", () => {

        setResult(
            text.value.toUpperCase()
        );

    });


    document.getElementById(
        "lowerBtn"
    ).addEventListener("click", () => {

        setResult(
            text.value.toLowerCase()
        );

    });

}


/* =========================================
   9. CHARACTER COUNTER
   ========================================= */

function characterTool() {

    return `

        <div class="tool-form">

            <div class="form-group">

                <label>Enter text</label>

                <textarea
                    id="characterText"
                    placeholder="Type or paste text..."></textarea>

            </div>


            <div class="live-stats">

                <div class="stat-box">
                    <strong id="withSpaces">0</strong>
                    <span>With Spaces</span>
                </div>

                <div class="stat-box">
                    <strong id="withoutSpaces">0</strong>
                    <span>Without Spaces</span>
                </div>

            </div>

        </div>

    `;

}


function activateCharacter() {

    const input =
        document.getElementById(
            "characterText"
        );


    input.addEventListener(
        "input",
        () => {

            document.getElementById(
                "withSpaces"
            ).textContent =
                input.value.length;

            document.getElementById(
                "withoutSpaces"
            ).textContent =
                input.value.replace(
                    /\s/g,
                    ""
                ).length;

        }
    );

}


/* =========================================
   10. CASE CONVERTER
   ========================================= */

function caseTool() {

    return standardForm(`

        <div class="form-group">

            <label>Text</label>

            <textarea
                id="caseText"
                placeholder="Enter your text..."></textarea>

        </div>


        <div class="form-group">

            <label>Case</label>

            <select id="caseType">

                <option value="upper">
                    UPPERCASE
                </option>

                <option value="lower">
                    lowercase
                </option>

                <option value="title">
                    Title Case
                </option>

                <option value="sentence">
                    Sentence case
                </option>

            </select>

        </div>

    `, "Convert Text");

}


function activateCase() {

    document.getElementById(
        "runTool"
    ).addEventListener("click", () => {

        const text =
            getValue("caseText");

        const type =
            getValue("caseType");


        let result = text;


        if (type === "upper") {

            result =
                text.toUpperCase();

        }


        if (type === "lower") {

            result =
                text.toLowerCase();

        }


        if (type === "title") {

            result =
                text.toLowerCase()
                    .replace(
                        /\b\w/g,
                        char =>
                            char.toUpperCase()
                    );

        }


        if (type === "sentence") {

            result =
                text
                    .toLowerCase()
                    .replace(
                        /(^\s*\w|[.!?]\s+\w)/g,
                        char =>
                            char.toUpperCase()
                    );

        }


        setResult(result);

    });

}


/* =========================================
   11. SENTENCE COUNTER
   ========================================= */

function sentenceTool() {

    return `

        <div class="tool-form">

            <div class="form-group">

                <label>Enter text</label>

                <textarea
                    id="sentenceText"
                    placeholder="Paste your text..."></textarea>

            </div>


            <div class="live-stats">

                <div class="stat-box">

                    <strong
                        id="sentenceTotal">
                        0
                    </strong>

                    <span>Sentences</span>

                </div>

            </div>

        </div>

    `;

}


function activateSentence() {

    const input =
        document.getElementById(
            "sentenceText"
        );


    input.addEventListener(
        "input",
        () => {

            const text =
                input.value.trim();

            const count =
                text
                    ? (
                        text.match(
                            /[.!?]+/g
                        ) || []
                    ).length
                    : 0;


            document.getElementById(
                "sentenceTotal"
            ).textContent =
                count;

        }
    );

}


/* =========================================
   12. READING TIME
   ========================================= */

function readingTool() {

    return `

        <div class="tool-form">

            <div class="form-group">

                <label>Enter text</label>

                <textarea
                    id="readingText"
                    placeholder="Paste an article, essay or script..."></textarea>

            </div>


            <div class="live-stats">

                <div class="stat-box">

                    <strong
                        id="readingWords">
                        0
                    </strong>

                    <span>Words</span>

                </div>


                <div class="stat-box">

                    <strong
                        id="readingMinutes">
                        0
                    </strong>

                    <span>Minutes</span>

                </div>

            </div>

        </div>

    `;

}


function activateReading() {

    const input =
        document.getElementById(
            "readingText"
        );


    input.addEventListener(
        "input",
        () => {

            const text =
                input.value.trim();

            const words =
                text
                    ? text.split(/\s+/).length
                    : 0;

            const minutes =
                words
                    ? Math.ceil(
                        words / 200
                    )
                    : 0;


            document.getElementById(
                "readingWords"
            ).textContent =
                words;

            document.getElementById(
                "readingMinutes"
            ).textContent =
                minutes;

        }
    );

}


/* =========================================
   13. YOUTUBE TAGS
   ========================================= */

function tagTool() {

    return standardForm(`

        <div class="form-group">

            <label>Video topic</label>

            <input
                id="tagTopic"
                placeholder="Kids space facts">

        </div>

    `, "Generate Tags");

}


function activateTags() {

    document.getElementById(
        "runTool"
    ).addEventListener("click", () => {

        const topic =
            getValue("tagTopic") ||
            "space";

        const clean =
            topic.toLowerCase()
                .replace(
                    /[^a-z0-9\s]/g,
                    ""
                );


        const words =
            clean
                .split(/\s+/)
                .filter(Boolean);


        const tags = [

            clean,

            `${clean} video`,

            `${clean} for beginners`,

            `${clean} explained`,

            `${clean} facts`,

            `learn ${clean}`,

            `${clean} tutorial`,

            `${clean} guide`,

            `${clean} tips`,

            `interesting ${clean}`,

            `best ${clean}`,

            `${clean} education`

        ];


        words.forEach(word => {

            if (!tags.includes(word)) {
                tags.push(word);
            }

        });


        setResult(
            tags.join(", ")
        );

    });

}


/* =========================================
   14. HASHTAGS
   ========================================= */

function hashtagTool() {

    return standardForm(`

        <div class="form-group">

            <label>Topic</label>

            <input
                id="hashtagTopic"
                placeholder="Artificial Intelligence">

        </div>


        <div class="form-group">

            <label>Platform</label>

            <select id="hashtagPlatform">

                <option>Instagram</option>
                <option>YouTube</option>
                <option>TikTok</option>
                <option>General</option>

            </select>

        </div>

    `, "Generate Hashtags");

}


function activateHashtags() {

    document.getElementById(
        "runTool"
    ).addEventListener("click", () => {

        const topic =
            getValue("hashtagTopic") ||
            "technology";


        const words =
            topic
                .toLowerCase()
                .replace(
                    /[^a-z0-9\s]/g,
                    ""
                )
                .split(/\s+/)
                .filter(Boolean);


        const base =
            words.join("");


        const tags = [

            `#${base}`,

            `#${base}tips`,

            `#${base}ideas`,

            `#${base}guide`,

            `#${base}community`,

            `#learn${base}`,

            `#${base}content`,

            `#${base}creator`,

            "#trending",

            "#contentcreator",

            "#digitalcreator",

            "#tips"

        ];


        setResult(
            tags.join(" ")
        );

    });

}


/* =========================================
   15. TEXT CLEANER
   ========================================= */

function cleanerTool() {

    return standardForm(`

        <div class="form-group">

            <label>Text to clean</label>

            <textarea
                id="cleanerText"
                placeholder="Paste messy text here..."></textarea>

        </div>

    `, "Clean Text");

}


function activateCleaner() {

    document.getElementById(
        "runTool"
    ).addEventListener("click", () => {

        const text =
            getValue("cleanerText");


        const cleaned =
            text
                .replace(
                    /[ \t]+/g,
                    " "
                )
                .replace(
                    /\n\s*\n+/g,
                    "\n\n"
                )
                .trim();


        setResult(cleaned);

    });

}


/* =========================================
   16. BIO GENERATOR
   ========================================= */

function bioTool() {

    return standardForm(`

        <div class="form-row">

            <div class="form-group">

                <label>Name</label>

                <input
                    id="bioName"
                    placeholder="Alex">

            </div>


            <div class="form-group">

                <label>Role / niche</label>

                <input
                    id="bioRole"
                    placeholder="Content Creator">

            </div>

        </div>


        <div class="form-group">

            <label>Interests</label>

            <input
                id="bioInterest"
                placeholder="Technology, AI, YouTube">

        </div>

    `, "Generate Bio");

}


function activateBio() {

    document.getElementById(
        "runTool"
    ).addEventListener("click", () => {

        const name =
            getValue("bioName") ||
            "Creator";

        const role =
            getValue("bioRole") ||
            "Content Creator";

        const interests =
            getValue("bioInterest") ||
            "technology";


        const result =

`Option 1:
${role} 🚀
Exploring ${interests}
Creating • Learning • Sharing

Option 2:
Hey, I'm ${name} 👋
${role}
Passionate about ${interests}

Option 3:
${role} | Creator
✨ ${interests}
Building ideas and sharing the journey.`;


        setResult(result);

    });

}


/* =========================================
   TOOL ACTIVATION
   ========================================= */

function activateCurrentTool(name) {

    switch (name) {

        case "prompt":
            activatePrompt();
            break;

        case "youtube-title":
            activateYoutubeTitle();
            break;

        case "content-ideas":
            activateContentIdeas();
            break;

        case "youtube-description":
            activateYoutubeDescription();
            break;

        case "thumbnail":
            activateThumbnail();
            break;

        case "quiz":
            activateQuiz();
            break;

        case "word":
            activateWord();
            break;

        case "formatter":
            activateFormatter();
            break;

        case "characters":
            activateCharacter();
            break;

        case "case":
            activateCase();
            break;

        case "sentences":
            activateSentence();
            break;

        case "reading":
            activateReading();
            break;

        case "tags":
            activateTags();
            break;

        case "hashtags":
            activateHashtags();
            break;

        case "cleaner":
            activateCleaner();
            break;

        case "bio":
            activateBio();
            break;

    }


    const copy =
        document.getElementById(
            "copyResult"
        );


    if (copy) {

        copy.addEventListener(
            "click",
            () => {

                const result =
                    document.getElementById(
                        "result"
                    );

                if (result) {

                    copyText(
                        result.textContent
                    );

                }

            }
        );

    }

}


/* =========================================
   HELPERS
   ========================================= */

function getValue(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";

}


function setResult(text) {

    const result =
        document.getElementById(
            "result"
        );

    if (result) {

        result.textContent =
            text || "No result.";

    }

}


/* =========================================
   GUIDE POPUPS
   ========================================= */

document.querySelectorAll(
    ".guide-more"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const guide =
                button.dataset.guide;

            const messages = {

                prompts:
`Good prompts usually contain:

1. The role the AI should take
2. The task
3. The target audience
4. The desired tone
5. Specific requirements
6. The format you want

Example:

"Act as a teacher. Explain photosynthesis to a Class 10 student using simple language and examples."`,

                "ai-tools":
`Browser tools and AI-powered tools are different.

Browser tools can perform many useful tasks locally with JavaScript.

Advanced AI features usually need an AI model API.

AIHub should keep those API keys on a secure backend instead of exposing them in frontend JavaScript.`,

                security:
`Never place a secret API key directly inside:

script.js
index.html
or any public GitHub repository.

A safer architecture is:

User
↓
AIHub frontend
↓
Your secure backend
↓
AI provider
↓
Your backend
↓
User

The secret API key stays on the server.`
            };


            alert(
                messages[guide] ||
                "Guide coming soon."
            );

        }
    );

});


/* =========================================
   START
   ========================================= */

filterTools();