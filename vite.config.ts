import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
    react(),
    {
      name: 'api-routes',
      configureServer(server) {
        // إضافة middleware لمعالجة نقاط النهاية API
        server.middlewares.use(async (req, res, next) => {
          // التحقق مما إذا كان الطلب لمسار API
          if (req.url && req.url.startsWith('/api/')) {
            const apiPath = req.url.split('?')[0]; // إزالة معلمات الاستعلام
            const apiName = apiPath.replace('/api/', '');
            const apiFilePath = path.resolve(__dirname, `src/api/${apiName}.js`);
            
            try {
              // التحقق من وجود ملف API
              if (fs.existsSync(apiFilePath)) {
                // تحميل وحدة API ديناميكيًا باستخدام مسار ملف URL صالح
                const fileUrl = 'file://' + apiFilePath.replace(/\/g, '/');
                console.log(`Loading API from: ${fileUrl}`);
                
                try {
                  // استخدام require.resolve للحصول على مسار مطلق قابل للاستخدام
                  const apiModule = await import(/* @vite-ignore */ fileUrl);
                  const handler = apiModule.default;
                  
                  // تجميع البيانات من الطلب
                  const chunks = [];
                  req.on('data', (chunk) => {
                    chunks.push(chunk);
                  });
                  
                  req.on('end', async () => {
                    try {
                      // تجهيز الطلب
                      const body = chunks.length > 0 ? JSON.parse(Buffer.concat(chunks).toString()) : {};
                      
                      // إعداد res._json لتقليد Next.js res.json()
                      res.json = (data) => {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(data));
                      };
                      
                      // إعداد res.status لتقليد Next.js res.status()
                      res.status = (statusCode) => {
                        res.statusCode = statusCode;
                        return res;
                      };
                      
                      // إنشاء كائن طلب محاكي
                      const mockReq = {
                        method: req.method,
                        url: req.url,
                        headers: req.headers,
                        body: body,
                        query: new URL(req.url, `http://${req.headers.host}`).searchParams
                      };
                      
                      // استدعاء معالج API
                      await handler(mockReq, res);
                    } catch (error) {
                      console.error('Error processing API request:', error);
                      res.statusCode = 500;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ error: 'Internal Server Error' }));
                    }
                  });
                  
                  return; // إنهاء المعالجة هنا
                } catch (importError) {
                  console.error('Error importing API module:', importError);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Failed to load API module' }));
                  return;
                }
              } else {
                // إذا لم يوجد ملف API، تابع إلى المعالج التالي
                next();
                return;
              }
            } catch (error) {
              console.error('Error in API middleware:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'API middleware error' }));
              return;
            }
          } else {
            // إذا لم يكن طلب API، تابع إلى المعالج التالي
            next();
          }
        });
      },
    },
  ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT) || 7777,
      host: true,
      open: false,
    },
    define: {
      // تمرير متغيرات البيئة إلى العميل
      'process.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      'process.env.VITE_SUPABASE_SERVICE_ROLE_KEY': JSON.stringify(env.VITE_SUPABASE_SERVICE_ROLE_KEY),
      'process.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(env.VITE_GOOGLE_CLIENT_ID),
      'process.env.VITE_LINKEDIN_CLIENT_ID': JSON.stringify(env.VITE_LINKEDIN_CLIENT_ID),
      'process.env.VITE_LINKEDIN_CLIENT_SECRET': JSON.stringify(env.VITE_LINKEDIN_CLIENT_SECRET),
      'process.env.VITE_LINKEDIN_REDIRECT_URI': JSON.stringify(env.VITE_LINKEDIN_REDIRECT_URI),
      'process.env.VITE_RESEND_API_KEY': JSON.stringify(env.VITE_RESEND_API_KEY),
      'process.env.VITE_STRIPE_PUBLISHABLE_KEY': JSON.stringify(env.VITE_STRIPE_PUBLISHABLE_KEY),
      'process.env.VITE_STRIPE_SECRET_KEY': JSON.stringify(env.VITE_STRIPE_SECRET_KEY),
      'process.env.VITE_STRIPE_WEBHOOK_SECRET': JSON.stringify(env.VITE_STRIPE_WEBHOOK_SECRET),
      'process.env.VITE_STRIPE_PRICE_ID_MONTHLY': JSON.stringify(env.VITE_STRIPE_PRICE_ID_MONTHLY),
      'process.env.VITE_STRIPE_PRICE_ID_YEARLY': JSON.stringify(env.VITE_STRIPE_PRICE_ID_YEARLY),
      'process.env.VITE_STRIPE_PRICE_ID_LIFETIME': JSON.stringify(env.VITE_STRIPE_PRICE_ID_LIFETIME),
      'process.env.VITE_CLOUDINARY_CLOUD_NAME': JSON.stringify(env.VITE_CLOUDINARY_CLOUD_NAME),
      'process.env.VITE_CLOUDINARY_API_KEY': JSON.stringify(env.VITE_CLOUDINARY_API_KEY),
      'process.env.VITE_CLOUDINARY_API_SECRET': JSON.stringify(env.VITE_CLOUDINARY_API_SECRET),
      'process.env.VITE_CLOUDINARY_UPLOAD_PRESET': JSON.stringify(env.VITE_CLOUDINARY_UPLOAD_PRESET),
      'process.env.VITE_OPENAI_API_KEY': JSON.stringify(env.VITE_OPENAI_API_KEY),
      'process.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
      'process.env.VITE_CLAUDE_API_KEY': JSON.stringify(env.VITE_CLAUDE_API_KEY),
      'process.env.VITE_ANTHROPIC_API_KEY': JSON.stringify(env.VITE_ANTHROPIC_KEY),
      'process.env.VITE_GROQ_API_KEY': JSON.stringify(env.VITE_GROQ_API_KEY),
      'process.env.VITE_PERPLEXITY_API_KEY': JSON.stringify(env.VITE_PERPLEXITY_API_KEY),
      'process.env.VITE_COHERE_API_KEY': JSON.stringify(env.VITE_COHERE_API_KEY),
      'process.env.VITE_HUGGINGFACE_API_KEY': JSON.stringify(env.VITE_HUGGINGFACE_API_KEY),
      'process.env.VITE_REPLICATE_API_TOKEN': JSON.stringify(env.VITE_REPLICATE_API_TOKEN),
      'process.env.VITE_STABILITY_API_KEY': JSON.stringify(env.VITE_STABILITY_API_KEY),
      'process.env.VITE_MIDJOURNEY_API_KEY': JSON.stringify(env.VITE_MIDJOURNEY_API_KEY),
      'process.env.VITE_LEONARDO_API_KEY': JSON.stringify(env.VITE_LEONARDO_API_KEY),
      'process.env.VITE_IDEOGRAM_API_KEY': JSON.stringify(env.VITE_IDEOGRAM_API_KEY),
      'process.env.VITE_FLUX_API_KEY': JSON.stringify(env.VITE_FLUX_API_KEY),
      'process.env.VITE_ELEVENLABS_API_KEY': JSON.stringify(env.VITE_ELEVENLABS_API_KEY),
      'process.env.VITE_MURF_API_KEY': JSON.stringify(env.VITE_MURF_API_KEY),
      'process.env.VITE_SPEECHIFY_API_KEY': JSON.stringify(env.VITE_SPEECHIFY_API_KEY),
      'process.env.VITE_WELLSAID_API_KEY': JSON.stringify(env.VITE_WELLSAID_API_KEY),
      'process.env.VITE_LUMA_API_KEY': JSON.stringify(env.VITE_LUMA_API_KEY),
      'process.env.VITE_RUNWAY_API_KEY': JSON.stringify(env.VITE_RUNWAY_API_KEY),
      'process.env.VITE_PIKA_API_KEY': JSON.stringify(env.VITE_PIKA_API_KEY),
      'process.env.VITE_SYNTHESIA_API_KEY': JSON.stringify(env.VITE_SYNTHESIA_API_KEY),
      'process.env.VITE_HEYGEN_API_KEY': JSON.stringify(env.VITE_HEYGEN_API_KEY),
      'process.env.VITE_D_ID_API_KEY': JSON.stringify(env.VITE_D_ID_API_KEY),
      'process.env.VITE_PORT': JSON.stringify(env.VITE_PORT),
    },
  };
});