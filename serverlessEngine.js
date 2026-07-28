// MathHero Automated Continuous Pipeline & Content Generation Script
const SUPABASE_URL = "https://supabase.co"; // Replace later with your free Supabase URL
const SUPABASE_KEY = "your-public-anon-key"; // Replace later with your free Supabase key

const adaptiveTemplates = {
    "SK": {
        language: "Malay",
        gameStyle: "Misi Kembara Rimba",
        syntaxPattern: "Selesaikan masalah harian berikut: "
    },
    "SJKC": {
        language: "Mandarin",
        gameStyle: "数码太空基地作战",
        syntaxPattern: "请计算以下应用题并输入正确得数："
    },
    "IGCSE": {
        language: "English",
        gameStyle: "Galaxy Resource Crafting Tycoon",
        syntaxPattern: "Solve the following algebraic or arithmetic mission checkpoint: "
    }
};

async function generateAndUploadMassiveContent(track, standardYear, chapterTitle) {
    const template = adaptiveTemplates[track];
    let structuredPayload = [];

    for (let currentLevel = 1; currentLevel <= 50; currentLevel++) {
        let numericValueA = Math.floor(Math.random() * 100) + currentLevel;
        let numericValueB = Math.floor(Math.random() * 50) + 5;
        let calculatedAnswer = numericValueA + numericValueB;

        structuredPayload.push({
            track_type: track,
            academic_level: standardYear,
            chapter_name: chapterTitle,
            difficulty_tier: currentLevel,
            game_viewport_text: `${template.syntaxPattern} ${numericValueA} + ${numericValueB} = ?`,
            expected_answer_key: String(calculatedAnswer),
            reward_points_xp: 20 + (currentLevel * 5)
        });
    }

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/math_vault_questions`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(structuredPayload)
        });
        if (response.ok) {
            console.log(`[SUCCESS] Uploaded 50 assets for ${track} - ${chapterTitle}.`);
        }
    } catch (error) {
        console.error("Database connection failed.", error);
    }
}
