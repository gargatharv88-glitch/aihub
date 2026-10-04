/* =========================================
   AIHUB - ADVANCED JAVASCRIPT
   GitHub Pages Compatible
   No API / No External Dependencies
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
   SAFE HELPERS
   ========================================= */

function getValue(id) {

    const element = document.getElementById(id);

    return element
        ? element.value.trim()
        : "";

}


function setResult(text) {

    const result =
        document.getElementById("result");

    if (result) {
        result.textContent =
            text || "No result.";
    }

}


function escapeRegExp(text) {

    return text.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

}


function cleanSpaces(text) {

    return String(text || "")
        .replace(/\s+/g, " ")
        .trim();

}


function capitalize(text) {

    if (!text) return "";

    return text.charAt(0).toUpperCase() +
        text.slice(1);

}


function unique(array) {

    return [...new Set(
        array.filter(Boolean)
    )];

}


/* =========================================
   THEME
   ========================================= */

const themeBtn =
    document.getElementById("themeBtn");

const savedTheme =
    localStorage.getItem("aihub-theme");

if (
    savedTheme === "dark" &&
    themeBtn
) {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle("dark");

            const dark =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "aihub-theme",
                dark ? "dark" : "light"
            );

            themeBtn.textContent =
                dark ? "☀️" : "🌙";

        }
    );

}


/* =========================================
   MOBILE MENU
   ========================================= */

const menuBtn =
    document.getElementById("menuBtn");

const mainNav =
    document.getElementById("mainNav");


if (menuBtn && mainNav) {

    menuBtn.addEventListener(
        "click",
        () => {

            mainNav.classList.toggle("open");

        }
    );

}


document.querySelectorAll("#mainNav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (mainNav) {
                    mainNav.classList.remove("open");
                }

            }
        );

    });


/* =========================================
   TOAST
   ========================================= */

function showToast(message) {

    if (!toast) return;

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

    if (!toolSearch) return;

    const query =
        toolSearch.value
            .toLowerCase()
            .trim();

    const activeButton =
        document.querySelector(
            ".category-btn.active"
        );

    const activeCategory =
        activeButton
            ? activeButton.dataset.category
            : "all";

    let visible = 0;

    toolCards.forEach(card => {

        const name =
            (card.dataset.name || "")
                .toLowerCase();

        const category =
            card.dataset.category || "";

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


    const noTools =
        document.getElementById("noTools");

    if (noTools) {

        noTools.style.display =
            visible === 0
                ? "block"
                : "none";

    }

}


if (toolSearch) {

    toolSearch.addEventListener(
        "input",
        filterTools
    );

}


if (heroSearch) {

    heroSearch.addEventListener(
        "input",
        () => {

            if (toolSearch) {
                toolSearch.value =
                    heroSearch.value;
            }

            const tools =
                document.getElementById("tools");

            if (tools) {

                tools.scrollIntoView({
                    behavior: "smooth"
                });

            }

            filterTools();

        }
    );

}


/* =========================================
   CATEGORY FILTER
   ========================================= */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            filterTools();

        }
    );

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
            "Generate smart, audience-aware and SEO-friendly YouTube title ideas.",
        interface: youtubeTitleTool
    },

    "content-ideas": {
        title: "Content Idea Generator",
        category: "CONTENT",
        icon: "💡",
        description:
            "Generate practical and varied content ideas for videos, posts and blogs.",
        interface: contentIdeasTool
    },

    "youtube-description": {
        title: "YouTube Description Generator",
        category: "YOUTUBE",
        icon: "📝",
        description:
            "Create structured YouTube descriptions with keywords, CTAs and hashtags.",
        interface: youtubeDescriptionTool
    },

    thumbnail: {
        title: "Thumbnail Prompt Generator",
        category: "YOUTUBE",
        icon: "🎨",
        description:
            "Create detailed prompts for eye-catching YouTube thumbnails.",
        interface: thumbnailTool
    },

    quiz: {
        title: "Quiz Generator",
        category: "STUDY",
        icon: "❓",
        description:
            "Create varied practice questions from any topic.",
        interface: quizTool
    },

    word: {
        title: "Word Counter",
        category: "TEXT",
        icon: "🔢",
        description:
            "Count words, characters, sentences and estimated reading time.",
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
            "Count characters with and without spaces.",
        interface: characterTool
    },

    case: {
        title: "Case Converter",
        category: "TEXT",
        icon: "Aa",
        description:
            "Convert text into uppercase, lowercase, title case and sentence case.",
        interface: caseTool
    },

    sentences: {
        title: "Sentence Counter",
        category: "TEXT",
        icon: "📄",
        description:
            "Count sentences in any text.",
        interface: sentenceTool
    },

    reading: {
        title: "Reading Time Calculator",
        category: "TEXT",
        icon: "⏱️",
        description:
            "Estimate reading time and word count.",
        interface: readingTool
    },

    tags: {
        title: "YouTube Tag Generator",
        category: "YOUTUBE",
        icon: "🏷️",
        description:
            "Generate related YouTube keyword and tag suggestions.",
        interface: tagTool
    },

    hashtags: {
        title: "Hashtag Generator",
        category: "CONTENT",
        icon: "#️⃣",
        description:
            "Generate useful platform-friendly hashtag ideas.",
        interface: hashtagTool
    },

    cleaner: {
        title: "Text Cleaner",
        category: "TEXT",
        icon: "🧹",
        description:
            "Clean extra spaces, blank lines and messy formatting.",
        interface: cleanerTool
    },

    bio: {
        title: "Bio Generator",
        category: "CONTENT",
        icon: "👤",
        description:
            "Create polished social media bio ideas.",
        interface: bioTool
    }

};


/* =========================================
   OPEN TOOL
   ========================================= */

document.querySelectorAll(".tool-open")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openTool(
                    button.dataset.tool
                );

            }
        );

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

const closeWorkspace =
    document.getElementById("closeWorkspace");

if (closeWorkspace) {

    closeWorkspace.addEventListener(
        "click",
        () => {

            workspace.classList.add("hidden");

            const tools =
                document.getElementById("tools");

            if (tools) {

                tools.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


/* =========================================
   GENERIC FORM
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
   1. ADVANCED AI PROMPT BUILDER
   ========================================= */

function promptTool() {

    return standardForm(`

        <div class="form-group">

            <label>What do you want AI to do?</label>

            <textarea
                id="promptTask"
                placeholder="Example: Make a YouTube video about space for kids"></textarea>

            <small>
                Just describe your task. AIHub will automatically decide
                the audience, tone, format, length and useful requirements.
            </small>

        </div>

    `, "Build Advanced Prompt");

}


function activatePrompt() {

    const button =
        document.getElementById("runTool");

    if (!button) return;

    button.addEventListener("click", () => {

        const task =
            getValue("promptTask").trim();

        if (!task) {

            setResult(
                "Please enter what you want the AI to do."
            );

            return;
        }


        /* =====================================
           AUTOMATIC CONTEXT DETECTION
           ===================================== */

        const lowerTask =
            task.toLowerCase();


        /* Audience */

        let audience =
            "General audience";

        if (
            lowerTask.includes("kid") ||
            lowerTask.includes("children") ||
            lowerTask.includes("child") ||
            lowerTask.includes("nursery") ||
            lowerTask.includes("cartoon")
        ) {

            audience =
                "Children appropriate for the topic, with simple and easy-to-understand language";

        } else if (
            lowerTask.includes("student") ||
            lowerTask.includes("school") ||
            lowerTask.includes("class") ||
            lowerTask.includes("homework") ||
            lowerTask.includes("exam")
        ) {

            audience =
                "Students, with clear and age-appropriate educational language";

        } else if (
            lowerTask.includes("developer") ||
            lowerTask.includes("coding") ||
            lowerTask.includes("programming") ||
            lowerTask.includes("software")
        ) {

            audience =
                "People interested in technology and programming";

        }


        /* Tone */

        let tone =
            "Clear, helpful and engaging";

        if (
            lowerTask.includes("youtube") ||
            lowerTask.includes("video") ||
            lowerTask.includes("reel") ||
            lowerTask.includes("short")
        ) {

            tone =
                "Engaging, energetic and audience-friendly";

        } else if (
            lowerTask.includes("school") ||
            lowerTask.includes("homework") ||
            lowerTask.includes("exam") ||
            lowerTask.includes("study")
        ) {

            tone =
                "Clear, educational and easy to understand";

        } else if (
            lowerTask.includes("professional") ||
            lowerTask.includes("business") ||
            lowerTask.includes("resume") ||
            lowerTask.includes("email")
        ) {

            tone =
                "Professional, polished and concise";

        }


        /* Content Type */

        let contentType =
            "Informative content";

        if (
            lowerTask.includes("youtube") ||
            lowerTask.includes("video")
        ) {

            contentType =
                "YouTube video content";

        } else if (
            lowerTask.includes("reel") ||
            lowerTask.includes("short")
        ) {

            contentType =
                "Short-form social media content";

        } else if (
            lowerTask.includes("article") ||
            lowerTask.includes("blog")
        ) {

            contentType =
                "Article or blog content";

        } else if (
            lowerTask.includes("essay")
        ) {

            contentType =
                "Essay";

        } else if (
            lowerTask.includes("email")
        ) {

            contentType =
                "Professional email";

        } else if (
            lowerTask.includes("code") ||
            lowerTask.includes("coding") ||
            lowerTask.includes("program")
        ) {

            contentType =
                "Programming solution with explanation";

        } else if (
            lowerTask.includes("quiz") ||
            lowerTask.includes("question")
        ) {

            contentType =
                "Questions or quiz content";

        }


        /* Output Format */

        let format =
            "Use clear headings, organized sections and easy-to-follow points.";

        if (
            lowerTask.includes("youtube") ||
            lowerTask.includes("video")
        ) {

            format =
                "Create a structured video script with an engaging introduction, main content, smooth transitions and a clear ending.";

        } else if (
            lowerTask.includes("reel") ||
            lowerTask.includes("short")
        ) {

            format =
                "Create a concise short-form script with a strong hook, clear main points and an engaging ending.";

        } else if (
            lowerTask.includes("article") ||
            lowerTask.includes("blog")
        ) {

            format =
                "Use a strong title, introduction, clear headings, useful sections and a conclusion.";

        } else if (
            lowerTask.includes("essay")
        ) {

            format =
                "Use an introduction, logically organized body paragraphs and a conclusion.";

        } else if (
            lowerTask.includes("quiz")
        ) {

            format =
                "Provide clearly numbered questions with multiple-choice options where appropriate, followed by an answer key.";

        } else if (
            lowerTask.includes("code") ||
            lowerTask.includes("coding") ||
            lowerTask.includes("program")
        ) {

            format =
                "Provide clean, readable code followed by a short explanation and usage instructions.";

        }


        /* Length */

        let length =
            "Use an appropriate length based on the task. Keep the response useful without unnecessary filler.";

        if (
            lowerTask.includes("short") ||
            lowerTask.includes("brief") ||
            lowerTask.includes("quick")
        ) {

            length =
                "Keep the response concise and focused while still covering the important information.";

        } else if (
            lowerTask.includes("detailed") ||
            lowerTask.includes("complete") ||
            lowerTask.includes("deep")
        ) {

            length =
                "Provide a detailed and comprehensive response while avoiding unnecessary repetition.";

        }


        /* Automatic Requirements */

        const requirements = [
            "Understand the user's exact goal before answering.",
            "Use accurate and relevant information.",
            "Do not add unnecessary filler.",
            "Keep the response logically organized.",
            "Use examples when they improve understanding.",
            "Follow the requested audience and tone.",
            "Make the final output practical and ready to use.",
            "If important information is missing, make a reasonable assumption instead of creating unnecessary confusion."
        ];


        /* =====================================
           FINAL ADVANCED PROMPT
           ===================================== */

        const result =
`Act as an expert assistant specialized in completing the user's requested task.

PRIMARY TASK:
${task}

AUTOMATICALLY SELECTED CONTEXT:

Target Audience:
${audience}

Tone:
${tone}

Content Type:
${contentType}

Output Format:
${format}

Length:
${length}

REQUIREMENTS:
${requirements.map((item, index) =>
    `${index + 1}. ${item}`
).join("\n")}

QUALITY GUIDELINES:
- Make the response specific to the task.
- Avoid generic or repetitive information.
- Prioritize clarity, usefulness and accuracy.
- Structure the response so it is easy to read.
- Match the complexity of the response to the target audience.
- Do not mention these instructions in the final answer.
- Do not explain your reasoning unless the user asks for it.

FINAL INSTRUCTION:
Complete the task directly and provide the best possible final answer in the required format.`;


        setResult(result);

    });

}
/* =========================================
   2. ADVANCED YOUTUBE TITLE GENERATOR
   ========================================= */

function youtubeTitleTool() {

    return standardForm(`

        <div class="form-group">

            <label>Video idea or topic</label>

            <textarea
                id="titleTopic"
                placeholder="Create a fun educational video about space, explaining the planets in a simple way for kids."></textarea>

        </div>

        <div class="form-row">

            <div class="form-group">

                <label>Audience</label>

                <select id="titleAudience">

                    <option value="auto">
                        Auto Detect
                    </option>

                    <option value="Kids">
                        Kids
                    </option>

                    <option value="Students">
                        Students
                    </option>

                    <option value="Beginners">
                        Beginners
                    </option>

                    <option value="General Audience">
                        General Audience
                    </option>

                </select>

            </div>

            <div class="form-group">

                <label>Style</label>

                <select id="titleStyle">

                    <option value="auto">
                        Auto Detect
                    </option>

                    <option value="Fun">
                        Fun
                    </option>

                    <option value="Educational">
                        Educational
                    </option>

                    <option value="Curiosity">
                        Curiosity
                    </option>

                    <option value="How-To">
                        How-To
                    </option>

                    <option value="Short & Punchy">
                        Short & Punchy
                    </option>

                </select>

            </div>

        </div>

    `, "Generate Smart Titles");

}


function extractYoutubeTopic(input) {

    let text =
        cleanSpaces(input)
            .replace(/[.!?]+$/, "");

    let topic = text;


    /* Remove opening commands */

    topic = topic.replace(
        /^(please\s+)?(make|create|write|generate|give|produce|build)\s+(me\s+)?/i,
        ""
    );


    /* Remove common article */

    topic = topic.replace(
        /^(a|an|the)\s+/i,
        ""
    );


    /* Find "about/on" */

    const about =
        topic.match(
            /(?:video|lesson|guide|content|short|episode)?\s*(?:about|on)\s+(.+)/i
        );

    if (about && about[1]) {
        topic = about[1];
    }


    /* Special "space, explaining the planets" pattern */

    const explaining =
        topic.match(
            /^(.+?),\s*(?:and\s+)?explaining\s+(.+?)(?:\s+in\s+(?:a\s+)?simple\s+way)?$/i
        );

    if (explaining) {

        const first =
            cleanSpaces(explaining[1]);

        const second =
            cleanSpaces(explaining[2]);

        topic =
            `${first} & ${second}`;

    }


    /* Other explaining pattern */

    const explaining2 =
        topic.match(
            /^(.+?)\s+(?:explaining|teaching|covering)\s+(.+)$/i
        );

    if (
        explaining2 &&
        !explaining
    ) {

        topic =
            `${cleanSpaces(explaining2[1])} & ${cleanSpaces(explaining2[2])}`;

    }


    /* Remove trailing audience phrases */

    topic = topic.replace(
        /\s+(?:for|made for)\s+(?:kids|children|students|beginners).*$/i,
        ""
    );


    /* Remove simple-way phrases */

    topic = topic.replace(
        /,?\s*(?:in|with)\s+(?:a\s+)?simple\s+(?:way|explanation).*$/i,
        ""
    );


    /* Remove descriptive filler */

    topic = topic.replace(
        /\b(fun|educational|informative|interesting)\s+(?:video|content)\b/gi,
        ""
    );


    topic = topic
        .replace(/\s+/g, " ")
        .replace(/^[,\s]+|[,\s]+$/g, "")
        .trim();


    return capitalize(topic || "Your Topic");

}


function detectYoutubeAudience(text) {

    if (
        /\b(kids|kid|children|child|nursery|cartoon|preschool|toddlers?)\b/i
        .test(text)
    ) {
        return "Kids";
    }

    if (
        /\b(student|students|school|class|exam|homework|study|learner)\b/i
        .test(text)
    ) {
        return "Students";
    }

    if (
        /\b(beginner|beginners|basic|basics|learn from scratch)\b/i
        .test(text)
    ) {
        return "Beginners";
    }

    return "General Audience";

}


function detectYoutubeContentType(text) {

    if (
        /\b(explain|explaining|explained|understand|simple explanation)\b/i
        .test(text)
    ) {
        return "Explainer";
    }

    if (
        /\b(how to|tutorial|step by step|guide)\b/i
        .test(text)
    ) {
        return "How-To";
    }

    if (
        /\b(fact|facts|trivia|did you know)\b/i
        .test(text)
    ) {
        return "Facts";
    }

    if (
        /\b(review|reviews|unboxing)\b/i
        .test(text)
    ) {
        return "Review";
    }

    if (
        /\b(story|stories|adventure|tale)\b/i
        .test(text)
    ) {
        return "Story";
    }

    if (
        /\b(list|top \d+|best \d+|ideas)\b/i
        .test(text)
    ) {
        return "List";
    }

    return "Video";

}


function detectYoutubeStyle(
    text,
    audience,
    contentType
) {

    if (
        /\b(fun|funny|exciting|playful|adventure)\b/i
        .test(text)
    ) {
        return "Fun";
    }

    if (audience === "Kids") {
        return "Fun";
    }

    if (
        contentType === "Explainer" ||
        contentType === "Facts"
    ) {
        return "Educational";
    }

    if (contentType === "How-To") {
        return "How-To";
    }

    return "Curiosity";

}


function activateYoutubeTitle() {

    const button =
        document.getElementById("runTool");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const userInput =
                getValue("titleTopic");

            if (!userInput) {

                setResult(
                    "Please enter a video idea or topic first."
                );

                return;

            }


            const topic =
                extractYoutubeTopic(userInput);


            let audience =
                getValue("titleAudience") ||
                "auto";


            if (audience === "auto") {

                audience =
                    detectYoutubeAudience(
                        userInput
                    );

            }


            const contentType =
                detectYoutubeContentType(
                    userInput
                );


            let style =
                getValue("titleStyle") ||
                "auto";


            if (style === "auto") {

                style =
                    detectYoutubeStyle(
                        userInput,
                        audience,
                        contentType
                    );

            }


            let titles = [];


            /* KIDS + FUN */

            if (
                audience === "Kids" &&
                style === "Fun"
            ) {

                titles = [

                    `Let's Explore ${topic}! 🚀`,

                    `Amazing ${topic} Facts for Kids! 🪐`,

                    `${topic} Explained for Kids 🌟`,

                    `Discover the Amazing World of ${topic}! 🎉`,

                    `Fun Facts About ${topic}! 🤩`,

                    `Let's Learn About ${topic} Together! 🚀`,

                    `The Amazing ${topic} Adventure! 🌈`,

                    `Wow! Amazing Things About ${topic}! ✨`

                ];

            }


            else if (style === "Educational") {

                titles = [

                    `${topic} Explained Simply`,

                    `${topic} Explained for Beginners`,

                    `Learn About ${topic} in a Simple Way`,

                    `${topic}: Everything You Need to Know`,

                    `Understanding ${topic} Made Easy`,

                    `Amazing Facts About ${topic}`,

                    `What Is ${topic}? Simple Explanation`,

                    `${topic} Made Easy to Understand`

                ];

            }


            else if (style === "How-To") {

                titles = [

                    `How to Understand ${topic} Easily`,

                    `How ${topic} Works — Simple Explanation`,

                    `How to Learn ${topic} Step by Step`,

                    `How to Get Started With ${topic}`,

                    `${topic}: Easy Step-by-Step Guide`,

                    `Learn ${topic} From Scratch`,

                    `The Beginner's Guide to ${topic}`,

                    `How Does ${topic} Work?`

                ];

            }


            else if (style === "Short & Punchy") {

                titles = [

                    `${topic} Made Easy`,

                    `${topic} Explained!`,

                    `${topic} — WOW!`,

                    `Quick ${topic} Facts`,

                    `${topic} in Minutes`,

                    `Everything About ${topic}`,

                    `The ${topic} Explained`,

                    `${topic}: Simple & Fast`

                ];

            }


            else {

                titles = [

                    `You Won't Believe These Amazing ${topic} Facts!`,

                    `What You Didn't Know About ${topic}`,

                    `The Amazing Truth About ${topic}`,

                    `How Much Do You Really Know About ${topic}?`,

                    `These ${topic} Facts Will Surprise You!`,

                    `The Secret World of ${topic}`,

                    `Why Is ${topic} So Interesting?`,

                    `Before You Learn About ${topic}, Watch This!`

                ];

            }


            titles =
                unique(titles)
                    .slice(0, 8);


            const result =
`SMART YOUTUBE TITLES

Topic:
${topic}

Audience:
${audience}

Content Type:
${contentType}

Style:
${style}

Generated Titles:

${titles
    .map(
        (title, index) =>
            `${index + 1}. ${title}`
    )
    .join("\n\n")}


TIP:
Choose a title that accurately represents your video. Avoid misleading clickbait.`;


            setResult(result);

        }
    );

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

    const button =
        document.getElementById("runTool");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const topic =
                getValue("ideaTopic") ||
                "Technology";

            const platform =
                getValue("ideaPlatform");


            const ideas = [

                `10 Things Beginners Should Know About ${topic}`,

                `5 Surprising Facts About ${topic}`,

                `The Biggest Mistakes People Make With ${topic}`,

                `Beginner's Guide to ${topic}`,

                `Myths vs Facts: ${topic}`,

                `How Does ${topic} Actually Work?`,

                `Common Questions About ${topic}`,

                `${topic}: Beginner vs Expert`,

                `The Future of ${topic}`,

                `Things I Wish I Knew Before Learning ${topic}`,

                `Top 10 ${topic} Tips for Beginners`,

                `A Simple Challenge Based on ${topic}`

            ];


            setResult(
`CONTENT IDEAS

Platform:
${platform}

Topic:
${topic}

Ideas:

${ideas
    .map(
        (idea, index) =>
            `${index + 1}. ${idea}`
    )
    .join("\n\n")}`
            );

        }
    );

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
                placeholder="Explain what your video is about..."></textarea>

        </div>

    `, "Generate Description");

}


function activateYoutubeDescription() {

    const button =
        document.getElementById("runTool");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const title =
                getValue("descriptionTitle") ||
                "My New Video";

            const topic =
                getValue("descriptionTopic") ||
                "In this video we explore an interesting topic.";


            const description =
`${topic}

Welcome to AIHub! In this video, we explore ${topic.toLowerCase()} in a simple, clear and engaging way.

What you'll learn:
• Key ideas explained simply
• Useful facts and examples
• Important points to remember
• Beginner-friendly information

If you found this video useful, consider liking the video and subscribing for more helpful content.

Thanks for watching!

#YouTube #Education #Learning`;


            setResult(
`TITLE:
${title}

DESCRIPTION:

${description}`
            );

        }
    );

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

    const button =
        document.getElementById("runTool");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const topic =
                getValue("thumbnailTopic") ||
                "Amazing Topic";

            const style =
                getValue("thumbnailStyle");


            const result =
`Create a high-quality YouTube thumbnail for:

"${topic}"

VISUAL STYLE:
${style}

PROMPT:

Create an eye-catching YouTube thumbnail about "${topic}".

Use a strong central subject with an instantly understandable visual story.

Requirements:
- ${style} visual style
- Bright and attractive composition
- Strong focal point
- Clear foreground and background separation
- Expressive subject
- Dynamic composition
- High visual contrast
- Clean background
- Large readable text area
- Professional YouTube thumbnail design
- No unnecessary clutter
- High detail
- Sharp image quality
- 16:9 aspect ratio
- Suitable for the target audience
- Attention-grabbing without being misleading

Avoid:
- Blurry elements
- Tiny unreadable text
- Overcrowded composition
- Excessive background details
- Random objects`;


            setResult(result);

        }
    );

}


/* =========================================
   6. QUIZ GENERATOR
   ========================================= */

function quizTool() {

    return standardForm(`

        <div class="form-group">

            <label>Quiz Topic</label>

            <textarea
                id="quizTopic"
                placeholder="Example: Planets and the Solar System"></textarea>

        </div>

        <div class="form-row">

            <div class="form-group">

                <label>Number of Questions</label>

                <select id="quizCount">
                    <option value="5">5 Questions</option>
                    <option value="10">10 Questions</option>
                </select>

            </div>

            <div class="form-group">

                <label>Difficulty</label>

                <select id="quizDifficulty">
                    <option value="Easy">Easy</option>
                    <option value="Medium" selected>Medium</option>
                    <option value="Hard">Hard</option>
                </select>

            </div>

        </div>

    `, "Generate Quiz");

}


function activateQuiz() {

    const button =
        document.getElementById("runTool");

    if (!button) return;

    button.addEventListener("click", () => {

        const topic =
            getValue("quizTopic").trim();

        const count =
            parseInt(getValue("quizCount")) || 5;

        const difficulty =
            getValue("quizDifficulty") || "Medium";


        if (!topic) {

            setResult(
                "Please enter a quiz topic."
            );

            return;

        }


        /*
         * Built-in question database.
         * Works completely offline.
         */

        const questionBank = {

            "space": [

                {
                    q: "Which planet is known as the Red Planet?",
                    options: ["Earth", "Mars", "Jupiter", "Venus"],
                    answer: "B) Mars"
                },

                {
                    q: "Which planet is the largest in our Solar System?",
                    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
                    answer: "C) Jupiter"
                },

                {
                    q: "Which planet is closest to the Sun?",
                    options: ["Mercury", "Venus", "Earth", "Mars"],
                    answer: "A) Mercury"
                },

                {
                    q: "Which planet is famous for its beautiful rings?",
                    options: ["Mars", "Saturn", "Venus", "Mercury"],
                    answer: "B) Saturn"
                },

                {
                    q: "How many planets are in our Solar System?",
                    options: ["7", "8", "9", "10"],
                    answer: "B) 8"
                },

                {
                    q: "Which planet is known for having life?",
                    options: ["Earth", "Mars", "Jupiter", "Neptune"],
                    answer: "A) Earth"
                },

                {
                    q: "Which planet is the hottest in our Solar System?",
                    options: ["Mercury", "Venus", "Mars", "Jupiter"],
                    answer: "B) Venus"
                },

                {
                    q: "What is at the center of our Solar System?",
                    options: ["Earth", "The Moon", "The Sun", "Jupiter"],
                    answer: "C) The Sun"
                }

            ],

            "solar": [

                {
                    q: "How many planets are in our Solar System?",
                    options: ["7", "8", "9", "10"],
                    answer: "B) 8"
                },

                {
                    q: "Which object is at the center of the Solar System?",
                    options: ["Earth", "Moon", "Sun", "Mars"],
                    answer: "C) Sun"
                },

                {
                    q: "Which planet is closest to the Sun?",
                    options: ["Venus", "Earth", "Mercury", "Mars"],
                    answer: "C) Mercury"
                },

                {
                    q: "Which planet is the largest?",
                    options: ["Earth", "Jupiter", "Saturn", "Neptune"],
                    answer: "B) Jupiter"
                },

                {
                    q: "Which planet is known as the Red Planet?",
                    options: ["Venus", "Mars", "Mercury", "Earth"],
                    answer: "B) Mars"
                }

            ]

        };


        const topicLower =
            topic.toLowerCase();


        let questions = null;


        if (
            topicLower.includes("space") ||
            topicLower.includes("planet")
        ) {

            questions =
                questionBank.space;

        } else if (
            topicLower.includes("solar")
        ) {

            questions =
                questionBank.solar;

        }


        /*
         * For topics without a built-in question bank,
         * create useful question templates instead of
         * showing empty placeholders.
         */

        if (!questions) {

            questions = [

                {
                    q: `What is one important fact about ${topic}?`,
                    options: [
                        `It is an important subject to learn`,
                        `It has no useful information`,
                        `It cannot be studied`,
                        `It has no real-world connection`
                    ],
                    answer: "A) It is an important subject to learn"
                },

                {
                    q: `Which statement best describes ${topic}?`,
                    options: [
                        `It can be understood through learning and examples`,
                        `It is impossible to understand`,
                        `It has no important concepts`,
                        `It cannot be explained`
                    ],
                    answer: "A) It can be understood through learning and examples"
                },

                {
                    q: `Why is learning about ${topic} useful?`,
                    options: [
                        `It helps build knowledge`,
                        `It prevents learning`,
                        `It has no purpose`,
                        `It cannot be studied`
                    ],
                    answer: "A) It helps build knowledge"
                },

                {
                    q: `Which approach is best when learning about ${topic}?`,
                    options: [
                        `Understand the key concepts`,
                        `Ignore the important information`,
                        `Avoid examples`,
                        `Skip the basic ideas`
                    ],
                    answer: "A) Understand the key concepts"
                },

                {
                    q: `What should a beginner do when studying ${topic}?`,
                    options: [
                        `Start with the basic concepts`,
                        `Skip all explanations`,
                        `Avoid learning the fundamentals`,
                        `Only memorize random information`
                    ],
                    answer: "A) Start with the basic concepts"
                }

            ];

        }


        /*
         * Shuffle questions
         */

        questions =
            [...questions]
            .sort(() => Math.random() - 0.5);


        /*
         * Select requested number
         */

        const selected =
            questions.slice(
                0,
                Math.min(count, questions.length)
            );


        /*
         * Build quiz output
         */

        let result =
`QUIZ: ${topic}

Difficulty:
${difficulty}

Questions:

`;


        selected.forEach((item, index) => {

            result +=
`${index + 1}. ${item.q}

A) ${item.options[0]}
B) ${item.options[1]}
C) ${item.options[2]}
D) ${item.options[3]}

Answer: ${item.answer}

`;

        });


        result +=
`ANSWER KEY

`;


        selected.forEach((item, index) => {

            result +=
`${index + 1}. ${item.answer}
`;

        });


        result +=
`
Tip:
Read each question carefully before checking the answer key.`;


        setResult(result);

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
        document.getElementById("wordText");

    if (!textarea) return;


    function update() {

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
                        /[^.!?]+[.!?]+/g
                    ) || []
                ).length
                : 0;

        const minutes =
            words
                ? Math.ceil(words / 200)
                : 0;


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
            text
                ? `${minutes} min`
                : "0 min";

    }


    textarea.addEventListener(
        "input",
        update
    );

}


/* =========================================
   8. TEXT FORMATTER
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

    const upper =
        document.getElementById(
            "upperBtn"
        );

    const lower =
        document.getElementById(
            "lowerBtn"
        );


    if (!text || !upper || !lower) return;


    upper.addEventListener(
        "click",
        () => {

            setResult(
                text.value.toUpperCase()
            );

        }
    );


    lower.addEventListener(
        "click",
        () => {

            setResult(
                text.value.toLowerCase()
            );

        }
    );

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

    if (!input) return;


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

    const button =
        document.getElementById("runTool");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

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
                    text
                        .toLowerCase()
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

        }
    );

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

                    <strong id="sentenceTotal">
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

    if (!input) return;


    input.addEventListener(
        "input",
        () => {

            const text =
                input.value.trim();

            const count =
                text
                    ? (
                        text.match(
                            /[^.!?]+[.!?]+/g
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

                    <strong id="readingWords">
                        0
                    </strong>

                    <span>Words</span>

                </div>

                <div class="stat-box">

                    <strong id="readingMinutes">
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

    if (!input) return;


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
                    ? Math.ceil(words / 200)
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
   13. YOUTUBE TAG GENERATOR
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

    const button =
        document.getElementById("runTool");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const topic =
                getValue("tagTopic") ||
                "space";


            const clean =
                topic
                    .toLowerCase()
                    .replace(
                        /[^a-z0-9\s&-]/g,
                        ""
                    )
                    .replace(/\s+/g, " ")
                    .trim();


            const tags = [

                clean,

                `${clean} video`,

                `${clean} explained`,

                `${clean} facts`,

                `${clean} for kids`,

                `${clean} for beginners`,

                `learn ${clean}`,

                `${clean} tutorial`,

                `${clean} guide`,

                `${clean} tips`,

                `${clean} education`,

                `interesting ${clean}`,

                `amazing ${clean}`,

                `best ${clean}`,

                `${clean} youtube`

            ];


            const words =
                clean
                    .replace(/[&-]/g, " ")
                    .split(/\s+/)
                    .filter(Boolean);


            words.forEach(word => {

                if (
                    word.length > 2 &&
                    !tags.includes(word)
                ) {

                    tags.push(word);

                }

            });


            setResult(
                unique(tags).join(", ")
            );

        }
    );

}


/* =========================================
   14. HASHTAG GENERATOR
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

    const button =
        document.getElementById("runTool");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const topic =
                getValue("hashtagTopic") ||
                "technology";

            const platform =
                getValue("hashtagPlatform");


            const words =
                topic
                    .toLowerCase()
                    .replace(
                        /[^a-z0-9\s]/g,
                        ""
                    )
                    .split(/\s+/)
                    .filter(Boolean);


            const joined =
                words.join("");

            const spaced =
                words.join("");


            let tags = [

                `#${joined}`,

                `#${joined}tips`,

                `#${joined}ideas`,

                `#${joined}guide`,

                `#learn${joined}`,

                `#${joined}content`,

                `#${joined}creator`,

                `#${joined}community`

            ];


            if (platform === "Instagram") {

                tags.push(
                    "#instagram",
                    "#reels",
                    "#instareels",
                    "#contentcreator"
                );

            }


            if (platform === "YouTube") {

                tags.push(
                    "#youtube",
                    "#youtuber",
                    "#youtubevideo",
                    "#shorts"
                );

            }


            if (platform === "TikTok") {

                tags.push(
                    "#tiktok",
                    "#fyp",
                    "#tiktokvideo",
                    "#viral"
                );

            }


            tags.push(
                "#trending",
                "#creator"
            );


            setResult(
                unique(tags).join(" ")
            );

        }
    );

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

    const button =
        document.getElementById("runTool");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const text =
                document.getElementById(
                    "cleanerText"
                ).value;


            const cleaned =
                text
                    .replace(
                        /[ \t]+/g,
                        " "
                    )
                    .replace(
                        /\n[ \t]+/g,
                        "\n"
                    )
                    .replace(
                        /\n{3,}/g,
                        "\n\n"
                    )
                    .trim();


            setResult(cleaned);

        }
    );

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

    const button =
        document.getElementById("runTool");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

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
`BIO OPTION 1

${role} 🚀
Exploring ${interests}
Creating • Learning • Sharing


BIO OPTION 2

Hey, I'm ${name} 👋
${role}
Passionate about ${interests}


BIO OPTION 3

${role} | Creator
✨ ${interests}
Building ideas and sharing the journey.


BIO OPTION 4

Creating content about ${interests} 💡
${role}
Learning. Creating. Growing. 🚀`;


            setResult(result);

        }
    );

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
6. The output format

Example:

"Act as a teacher. Explain photosynthesis to a Class 10 student using simple language and examples."`,

                "ai-tools":
`Browser tools and AI-powered tools are different.

AIHub's browser tools can perform useful tasks locally with JavaScript.

Advanced AI features usually require an AI model API.

Never expose private API keys inside frontend JavaScript or a public GitHub repository.`,

                security:
`Never place a secret API key directly inside:

script.js
index.html
or any public GitHub repository.

Safer architecture:

User
↓
AIHub frontend
↓
Secure backend
↓
AI provider
↓
Secure backend
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
