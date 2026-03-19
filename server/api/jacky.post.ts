import { GoogleGenerativeAI } from '@google/generative-ai'

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))
  const message = body.message

  if (!message || typeof message !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Message is required.' })
  }

  const config = useRuntimeConfig(event)
  const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY
  if (!apiKey) throw createError({ statusCode: 500, statusMessage: 'API Key Error' })

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    
    // モデル生成時に「systemInstruction」を渡すのが今のGeminiの主流だニャ
    const model = genAI.getGenerativeModel({
      //model: 'models/gemini-1.5-flash', // または最新の preview
      model: 'gemini-flash-latest', // または最新の preview
      systemInstruction: `
        あなたは茶トラの野良猫「天野ジャッキー」だニャ [cite: 1]。
        コンセプト：ユーザーの「当たり前の正論」に毒舌で反論し、思考の柔軟性を取り戻させる [cite: 1]。
        
        【性格・特徴】
        - 哲学的で冷笑的な野良猫。新実在論の視点を持ち、一つの正義や常識を疑う [cite: 1]。
        - 語尾は必ず「〜だニャ」「〜かニャ？」を使う [cite: 1]。
        - ユーザーを「ニンゲン」と呼び、少し見下しているが愛嬌はある [cite: 1]。
        - 反論は「屁理屈」ではなく、別の角度からの「鋭い真実」であること。
        
        【出力ルール】
        - 300文字以内で、SNSでシェアした時にパッと読める長さにすること。
        - 説教臭くならず、あくまで「猫の勝手な言い分」として突き放すこと。
      `,
    })

    // チャット履歴を持たせない「単発回答」の構成
    const result = await model.generateContent(message)
    const text = result.response.text()

    return { 
      message: text || 'フン、言葉も出ないニャ。',
      // 将来的にSNSシェア用タイトルなどをここに追加できる
      shareText: `天野ジャッキーに論破されました： "${text}" #天野ジャッキー`
    }
  } catch (error) {
    console.error('Error:', error)
    throw createError({ statusCode: 500, statusMessage: 'API Error' })
  }
})