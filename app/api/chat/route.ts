import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { toCity, days, travellers } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", 
        messages: [
          { 
            role: "system", 
            content: `Ты — эксперт по туризму в Казахстане. Твоя задача — составлять планы развлечений. 
            Работай строго с городом: ${toCity}. 
            Всегда возвращай данные строго в формате JSON с ключом "plans".` 
          },
          { 
            role: "user", 
            content: `Составь 3 варианта стратегии отдыха в городе ${toCity} на ${days} дн. для ${travellers || 1} чел.
            
            Варианты должны быть:
            1. "Эконом" (бюджет 5,000 - 15,000 ₸): бесплатные достопримечательности, парки, стрит-фуд.
            2. "Стандарт" (бюджет 30,000 - 55,000 ₸): музеи, популярные кафе, платные экскурсии.
            3. "Премиум" (бюджет 70,000 - 100,000 ₸): лучшие рестораны, индивидуальные туры, SPA.

            Формат ответа:
            {
              "plans": [
                {
                  "type": "Эконом",
                  "description": "Краткое описание специфики города ${toCity} для этого бюджета",
                  "activities": ["Список из 4 реальных локаций в ${toCity}"],
                  "savingTips": ["Конкретный совет для ${toCity}"],
                  "activitiesCost": число_в_диапазоне_от_5000_до_15000
                },
                {
                  "type": "Стандарт",
                  "description": "Описание",
                  "activities": ["Список"],
                  "savingTips": ["Совет"],
                  "activitiesCost": число_в_диапазоне_от_30000_до_55000
                },
                {
                  "type": "Премиум",
                  "description": "Описание",
                  "activities": ["Список"],
                  "savingTips": ["Совет"],
                  "activitiesCost": число_в_диапазоне_от_70000_до_100000
                }
              ]
            }` 
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7 // Добавляем немного креативности, чтобы планы были разными
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || "Groq Error" }, { status: response.status });
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("ИИ вернул пустой ответ");
    }

    // Возвращаем распарсенный JSON (уже содержащий объект { plans: [...] })
    return NextResponse.json(JSON.parse(content));

  } catch (error: any) {
    console.error("КРИТИЧЕСКАЯ ОШИБКА СЕРВЕРА:", error.message);
    return NextResponse.json({ error: "Server error: " + error.message }, { status: 500 });
  }
}