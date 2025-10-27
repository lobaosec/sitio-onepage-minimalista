'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  const quizData = [
    {
      question: "¿Cuál es tu objetivo principal?",
      options: [
        { text: "Bajar grasa corporal", weight: 3, points: 10 },
        { text: "Mejorar hábitos alimentarios", weight: 2, points: 15 },
        { text: "Aumentar energía diaria", weight: 1, points: 20 },
        { text: "Bienestar general", weight: 1, points: 25 }
      ]
    },
    {
      question: "¿Cuántas horas duermes en promedio?",
      options: [
        { text: "5 horas o menos", weight: 3, points: 5 },
        { text: "6-7 horas", weight: 2, points: 10 },
        { text: "7-8 horas", weight: 1, points: 20 },
        { text: "8 horas o más", weight: 0, points: 25 }
      ]
    },
    {
      question: "¿Cuál es tu nivel de actividad física semanal?",
      options: [
        { text: "Sedentario (sin ejercicio)", weight: 3, points: 5 },
        { text: "1-2 días por semana", weight: 2, points: 10 },
        { text: "3-4 días por semana", weight: 1, points: 20 },
        { text: "5 o más días por semana", weight: 0, points: 25 }
      ]
    },
    {
      question: "¿Cómo es tu ingesta de agua diaria?",
      options: [
        { text: "Baja (menos de 1 litro)", weight: 3, points: 5 },
        { text: "Media (1-1.5 litros)", weight: 2, points: 10 },
        { text: "Adecuada (1.5-2 litros)", weight: 1, points: 20 },
        { text: "Alta (más de 2 litros)", weight: 0, points: 25 }
      ]
    },
    {
      question: "¿Con qué frecuencia comes por hambre emocional?",
      options: [
        { text: "Frecuentemente", weight: 3, points: 5 },
        { text: "Ocasionalmente", weight: 2, points: 10 },
        { text: "Rara vez", weight: 1, points: 20 },
        { text: "Casi nunca", weight: 0, points: 25 }
      ]
    },
    {
      question: "¿Cómo es tu consumo de alimentos ultraprocesados?",
      options: [
        { text: "Alto (diariamente)", weight: 3, points: 5 },
        { text: "Medio (varias veces por semana)", weight: 2, points: 10 },
        { text: "Bajo (ocasionalmente)", weight: 1, points: 20 },
        { text: "Muy bajo (casi nunca)", weight: 0, points: 25 }
      ]
    },
    {
      question: "¿Qué tan regulares son tus horarios de comida?",
      options: [
        { text: "Muy irregulares", weight: 3, points: 5 },
        { text: "A veces regulares", weight: 2, points: 10 },
        { text: "Casi siempre regulares", weight: 1, points: 20 },
        { text: "Siempre regulares", weight: 0, points: 25 }
      ]
    },
    {
      question: "¿Cuántas porciones de legumbres/verduras consumes al día?",
      options: [
        { text: "0-1 porciones", weight: 3, points: 5 },
        { text: "2 porciones", weight: 2, points: 10 },
        { text: "3 porciones", weight: 1, points: 20 },
        { text: "4 o más porciones", weight: 0, points: 25 }
      ]
    },
    {
      question: "¿Cómo consideras tu consumo actual de sal?",
      options: [
        { text: "Muy alto", weight: 3, points: 5 },
        { text: "Alto", weight: 2, points: 10 },
        { text: "Moderado", weight: 1, points: 20 },
        { text: "Bajo", weight: 0, points: 25 }
      ]
    },
    {
      question: "¿Qué nivel de apoyo social tienes para tus hábitos saludables?",
      options: [
        { text: "Nulo", weight: 3, points: 5 },
        { text: "Bajo", weight: 2, points: 10 },
        { text: "Moderado", weight: 1, points: 20 },
        { text: "Alto", weight: 0, points: 25 }
      ]
    }
  ];

  const selectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    
    // Gamificación: añadir puntos por respuesta
    const earnedPoints = quizData[currentQuestion].options[optionIndex].points;
    setPoints(prev => prev + earnedPoints);
    
    // Efecto visual de puntos ganados
    setTimeout(() => {
      const pointsElement = document.createElement('div');
      pointsElement.textContent = `+${earnedPoints} puntos`;
      pointsElement.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-lg z-50 animate-bounce';
      document.body.appendChild(pointsElement);
      setTimeout(() => document.body.removeChild(pointsElement), 1500);
    }, 100);
  };

  const nextQuestion = () => {
    if (answers[currentQuestion] !== undefined && currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setStreak(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    const score = answers.reduce((total, answerIndex, questionIndex) => {
      return total + quizData[questionIndex].options[answerIndex].weight;
    }, 0);
    setTotalScore(score);
    
    // Calcular nivel basado en puntos
    const newLevel = Math.floor(points / 100) + 1;
    setUserLevel(newLevel);
    
    // Otorgar badges basados en el desempeño
    const newBadges = [];
    if (points >= 200) newBadges.push('🏆 Experto en Salud');
    if (points >= 150) newBadges.push('🌟 Hábitos Sólidos');
    if (points >= 100) newBadges.push('💪 En Progreso');
    if (streak >= 5) newBadges.push('🔥 Racha Perfecta');
    setBadges(newBadges);
    
    setShowResult(true);
  };

  const getResult = () => {
    if (totalScore >= 20) {
      return {
        profile: "Base de hábitos por construir",
        color: "from-orange-400 to-red-500",
        bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
        recommendations: (
          <div>
            <p>Hola, soy Julia, tu nutricionista virtual. He analizado tus respuestas y veo que estás en un momento perfecto para construir bases sólidas. No te preocupes, todos empezamos desde algún lugar.</p>
            <p>Tu perfil indica que necesitas enfocarte en la consistencia básica. Los pequeños cambios sostenidos en el tiempo son más poderosos que las transformaciones drásticas.</p>
            <h4 className="font-semibold mt-4 mb-2 text-orange-800">Mis recomendaciones para ti:</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Hidratación consciente:</strong> Comienza cada comida con un vaso de agua</li>
              <li><strong>Ritual de sueño:</strong> Establece una hora fija para acostarte</li>
              <li><strong>Fibra en cada comida:</strong> Añade una porción de verduras o legumbres</li>
              <li><strong>Organización semanal:</strong> Planifica 3 comidas principales</li>
              <li><strong>Movimiento diario:</strong> 10 minutos de caminata después de comer</li>
            </ul>
          </div>
        )
      };
    } else if (totalScore >= 10) {
      return {
        profile: "Intermedio",
        color: "from-blue-400 to-teal-500",
        bgColor: "bg-gradient-to-br from-blue-50 to-teal-50",
        recommendations: (
          <div>
            <p>¡Hola! Soy Julia, y me alegra ver que ya tienes algunas bases establecidas. Tu perfil muestra que estás listo para pequeños ajustes que pueden generar grandes cambios.</p>
            <p>Tienes hábitos que funcionan, pero hay áreas donde podemos optimizar para mejorar tu balance y saciedad natural.</p>
            <h4 className="font-semibold mt-4 mb-2 text-blue-800">Mis recomendaciones para ti:</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Balance de macronutrientes:</strong> Incluye proteína en cada comida principal</li>
              <li><strong>Gestión del hambre emocional:</strong> Pausa de 5 minutos antes de comer por impulso</li>
              <li><strong>Calidad del sueño:</strong> Evita pantallas 1 hora antes de dormir</li>
              <li><strong>Hidratación estratégica:</strong> Agua con limón al despertar</li>
              <li><strong>Actividad física progresiva:</strong> Aumenta gradualmente tu rutina actual</li>
            </ul>
          </div>
        )
      };
    } else {
      return {
        profile: "Avanzado",
        color: "from-emerald-400 to-green-600",
        bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
        recommendations: (
          <div>
            <p>¡Excelente! Soy Julia, y puedo ver que tienes una base sólida de hábitos saludables. Tu perfil indica que estás listo para optimizar detalles y crear rituales de constancia.</p>
            <p>Tu enfoque ahora debe estar en la consistencia a largo plazo y en pequeños ajustes que mantengan tu motivación alta.</p>
            <h4 className="font-semibold mt-4 mb-2 text-emerald-800">Mis recomendaciones para ti:</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Rituales de constancia:</strong> Crea señales visuales para tus hábitos</li>
              <li><strong>Variedad nutritiva:</strong> Experimenta con nuevas verduras y especias</li>
              <li><strong>Recuperación activa:</strong> Incluye técnicas de relajación</li>
              <li><strong>Planificación avanzada:</strong> Meal prep semanal estratégico</li>
              <li><strong>Monitoreo consciente:</strong> Lleva un registro simple de energía diaria</li>
            </ul>
          </div>
        )
      };
    }
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-emerald-100 via-teal-100 to-blue-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full font-semibold mb-6">
              <span>🌱</span>
              <span>Evaluación Nutricional Inteligente</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-700 via-teal-700 to-blue-700 bg-clip-text text-transparent mb-6">
              Plan de Adelgazamiento Inteligente — Evaluado por la Profesora y Nutricionista Julia (IA)
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-12 leading-relaxed">
              Un enfoque práctico para avanzar sin dietas extremas: responde el quiz, recibe tu evaluación y descubre una receta sencilla con sal rosada para reforzar tu constancia.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: "🎯", text: "Diagnóstico rápido de tus hábitos actuales" },
                { icon: "💡", text: "Recomendaciones realistas y aplicables" }, 
                { icon: "🧂", text: "Receta fácil para acompañar tu día a día" },
                { icon: "🌿", text: "Enfoque responsable y sostenible" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <div className="text-2xl">{benefit.icon}</div>
                  <p className="text-gray-700 font-medium">{benefit.text}</p>
                </div>
              ))}
            </div>
            
            <a href="#quiz" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              🚀 Comenzar el Quiz
            </a>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-16">Cómo funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                icon: "📝",
                title: "Responde el quiz",
                description: "Contesta 10 preguntas sobre tus hábitos actuales de forma honesta y rápida.",
                color: "from-orange-400 to-red-500"
              },
              {
                number: "2",
                icon: "🤖", 
                title: "Recibe evaluación de Julia (IA)",
                description: "Obtén un análisis personalizado de tu perfil y recomendaciones específicas.",
                color: "from-blue-400 to-indigo-500"
              },
              {
                number: "3",
                icon: "🧂",
                title: "Conoce la receta con sal rosada", 
                description: "Accede a una mezcla práctica para acompañar tus comidas y reforzar tus hábitos.",
                color: "from-emerald-400 to-teal-500"
              }
            ].map((step, index) => (
              <div key={index} className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
                  {step.number}
                </div>
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 sm:p-12 border border-emerald-100">
            {!showResult ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mb-4">Tu evaluación personalizada</h2>
                  <p className="text-lg text-gray-600">Responde con honestidad. Tarda 2–3 minutos. No guardamos tus datos.</p>
                  
                  {/* Panel de gamificación */}
                  <div className="flex justify-center items-center gap-6 mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{points}</div>
                      <div className="text-sm text-gray-600">Puntos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">Nivel {userLevel}</div>
                      <div className="text-sm text-gray-600">Progreso</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{streak}</div>
                      <div className="text-sm text-gray-600">Racha</div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full mb-8 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-600">Pregunta {currentQuestion + 1} de {quizData.length}</h3>
                    <div className="flex gap-1">
                      {Array.from({length: currentQuestion + 1}).map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{quizData[currentQuestion].question}</h3>
                  <div className="space-y-3">
                    {quizData[currentQuestion].options.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => selectOption(index)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-102 ${
                          answers[currentQuestion] === index
                            ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 shadow-lg'
                            : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{option.text}</span>
                          <span className="text-sm font-semibold text-emerald-600">+{option.points} pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={previousQuestion}
                    className={`px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors ${
                      currentQuestion === 0 ? 'invisible' : ''
                    }`}
                  >
                    ← Anterior
                  </button>
                  
                  {currentQuestion === quizData.length - 1 ? (
                    <button
                      onClick={submitQuiz}
                      className={`px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:scale-105 ${
                        answers[currentQuestion] === undefined ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={answers[currentQuestion] === undefined}
                    >
                      🎉 Ver mi evaluación
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className={`px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:scale-105 ${
                        answers[currentQuestion] === undefined ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={answers[currentQuestion] === undefined}
                    >
                      Siguiente →
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center">
                {/* Resultados con gamificación */}
                <div className={`p-8 rounded-2xl mb-8 ${getResult().bgColor}`}>
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-r ${getResult().color} rounded-full flex items-center justify-center text-3xl text-white font-bold`}>
                      {userLevel}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">Tu Perfil: {getResult().profile}</h3>
                      <p className="text-lg text-gray-600">Nivel {userLevel} • {points} puntos totales</p>
                    </div>
                  </div>
                  
                  {/* Badges obtenidos */}
                  {badges.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">🏆 Logros obtenidos:</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {badges.map((badge, index) => (
                          <span key={index} className="bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-left text-gray-600 mb-8">
                  {getResult().recommendations}
                </div>
                <p className="text-sm italic text-gray-500 mb-2">— Profesora y Nutricionista Julia (IA)</p>
                <p className="text-sm text-gray-500 mb-8">
                  <em>Esto no sustituye asesoramiento médico profesional.</em>
                </p>
                <a 
                  href="https://pay.mycheckoutt.com/0199e2ed-1ca2-7333-95c3-8da6f459dc90?ref=" 
                  className={`inline-block bg-gradient-to-r ${getResult().color} text-white px-10 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
                >
                  🎯 Acceder a la receta completa
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recipe Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white px-6 py-2 rounded-full font-semibold mb-6">
              <span>🧂</span>
              <span>Receta Especial</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent mb-4">La Receta Sencilla con Sal Rosada para tu Rutina</h2>
            <p className="text-lg text-gray-700 mb-8">Una mezcla práctica para acompañar tus comidas y recordarte tus hábitos clave.</p>
            <a 
              href="https://pay.mycheckoutt.com/0199e2ed-1ca2-7333-95c3-8da6f459dc90?ref=" 
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl mb-12"
            >
              🔓 Acceder ahora
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white text-xl">
                  🥄
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Ingredientes</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  1 cda de sal rosada de buena calidad
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  1 cda de semillas de sésamo ligeramente tostadas
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  ½ cda de ajo en polvo (opcional)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  ½ cda de pimentón dulce o ahumado (opcional)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  Pimienta negra molida al gusto
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  Ralladura de limón (opcional, para aroma)
                </li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white text-xl">
                  👩‍🍳
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Preparación</h3>
              </div>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                  Mezcla todo homogéneamente y guarda en frasco hermético.
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                  Usa una pequeña pizca para dar sabor a vegetales, legumbres o proteínas.
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                  Integra el uso como ritual de constancia: cada comida = 1 recordatorio de tus hábitos (agua, verduras, porciones conscientes).
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                  Ajusta cantidades según tu preferencia y recomendaciones de tu profesional de salud.
                </li>
              </ol>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">⚠️</div>
              <h4 className="text-xl font-bold text-yellow-800">Notas importantes</h4>
            </div>
            <ul className="space-y-2 text-yellow-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                No excedas el consumo de sal recomendado para ti.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                Si tienes hipertensión o restricciones, consulta a tu profesional de salud.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                Esta receta no promete resultados; es un apoyo dentro de hábitos saludables.
              </li>
            </ul>
          </div>

          <div className="text-center">
            <a 
              href="https://pay.mycheckoutt.com/0199e2ed-1ca2-7333-95c3-8da6f459dc90?ref=" 
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              🎯 Acceder ahora
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-16">Experiencias reales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Me ayudó a organizar mis comidas y crear una rutina más consciente. La receta es práctica y sabrosa.",
                author: "M.R., Madrid",
                rating: 5,
                color: "from-emerald-400 to-teal-500"
              },
              {
                text: "El quiz me hizo reflexionar sobre mis hábitos. Las recomendaciones son realistas y fáciles de seguir.",
                author: "C.L., Barcelona",
                rating: 5,
                color: "from-blue-400 to-indigo-500"
              },
              {
                text: "Me dio constancia en pequeños cambios diarios. La sal rosada se convirtió en mi recordatorio perfecto.",
                author: "A.M., Valencia",
                rating: 5,
                color: "from-purple-400 to-pink-500"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-teal-100">
                <div className="flex justify-center mb-4">
                  {Array.from({length: testimonial.rating}).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4 text-center">"{testimonial.text}"</p>
                <div className="text-center">
                  <div className={`inline-block w-12 h-12 bg-gradient-to-r ${testimonial.color} rounded-full mb-2`}></div>
                  <p className="font-semibold text-gray-900 text-sm">— {testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Experiencias personales. Resultados diferentes para cada persona.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-16">Preguntas frecuentes</h2>
          
          {[
            {
              question: "¿Cuánto tarda el quiz?",
              answer: "El quiz toma aproximadamente 2-3 minutos en completarse. Son 10 preguntas sencillas sobre tus hábitos actuales.",
              icon: "⏱️"
            },
            {
              question: "¿Qué incluye la evaluación?",
              answer: "Recibes un análisis personalizado de tu perfil actual, recomendaciones específicas de hábitos y acceso a la receta con sal rosada.",
              icon: "📊"
            },
            {
              question: "¿La receta sustituye tratamiento médico?",
              answer: "No. Esta receta es un complemento informativo para acompañar hábitos saludables. No sustituye el consejo médico profesional.",
              icon: "⚕️"
            },
            {
              question: "¿Puedo usarla si tengo presión alta?",
              answer: "Si tienes hipertensión o cualquier condición de salud, consulta a tu profesional de salud antes de usar la receta o hacer cambios en tu dieta.",
              icon: "🩺"
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg mb-4 border border-indigo-100 overflow-hidden">
              <div 
                className="p-6 cursor-pointer flex justify-between items-center hover:bg-indigo-50/50 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{faq.icon}</span>
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                </div>
                <span className={`text-2xl font-light transition-transform duration-300 ${openFaq === index ? 'rotate-45' : ''}`}>
                  {openFaq === index ? '−' : '+'}
                </span>
              </div>
              {openFaq === index && (
                <div className="px-6 pb-6 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                  <p className="text-gray-600 pl-11">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <a href="#" className="text-white hover:text-emerald-400 transition-colors mx-4">Aviso legal</a>
            <a href="#" className="text-white hover:text-emerald-400 transition-colors mx-4">Términos</a>
            <a href="#" className="text-white hover:text-emerald-400 transition-colors mx-4">Privacidad</a>
          </div>
          <p className="text-gray-400 text-sm">
            Este contenido es informativo y no constituye consejo médico. Los resultados pueden variar según cada persona. Si tienes condiciones de salud o tomas medicación, consulta a tu profesional de salud.
          </p>
        </div>
      </footer>
    </div>
  );
}