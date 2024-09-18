'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shuffle } from 'lucide-react'

const catImages = [
  'https://images.unsplash.com/photo-1498100152307-ce63fd6c5424?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1677545182425-4fb12bdb9faf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1664299749481-ac8dc8b49754?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8MHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1661674514856-17f29bd480b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1534803359379-964dadf6c290?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1498336179775-9836baef8fdf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/uploads/141319662617846f3b4c9/1677b57d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1661729755480-4fdb5105b53e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1448222993383-a2fff2914d27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1455525928928-837c99714248?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1511694009171-3cdddf4484ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1520560321666-4b36560e7979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1494342311068-0acb56cfa61d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1498579687545-d5a4fffb0a9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1456796148441-485386946471?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1516978101789-720eacb59e79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1664371206019-a82ba8d7c2e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1552944150-6dd1180e5999?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1510758422680-d90101a5fecd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1552944150-6dd1180e5999?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1516470544373-df3edeb89d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1482848945261-8bbeabb5e3fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1671976322598-9e74cc5f1826?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1550414485-9f22b971dbf0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1673382904016-3c98ae830cd5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1568307970720-a8c50b644a7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1513977055326-8ae6272d90a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1513325311554-919df6bad5fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1667566994055-1ea20a51a137?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1667667846205-59206e7e6b17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1457781124770-31d58ecd4be3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1515073883629-5e2924e3e106?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1515073883629-5e2924e3e106?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1543201245-c9031909fe6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1495365043435-a7d3df121147?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1707353402256-3afa1e567b54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1542279836-8369a296a95b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1496661269814-a841e78df103?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1507568237455-03228e5ddb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1545155592-244d23b0b169?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1667667846329-dacc881728bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGNhdHxlbnwwfDB8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1513451713350-dee890297c4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fGNhdHxlbnwwfDB8MHx8fDA%3D'
]

const funnyCaptions = [
  "I'm not lazy, I'm on energy-saving mode",
  "I'm not bossy, I just have better ideas",
  "I'm not fat, I'm just fluffy",
  "I'm not spoiled, I'm just well taken care of",
  "I'm not mean, I'm just brutally honest",
  "I'm not napping, I'm practicing my ninja skills",
  "I'm not ignoring you, I'm just very focused on doing nothing",
  "I'm not judging you, this is just my face",
  "I'm not aloof, I'm just playing hard to get",
  "I'm not messy, I'm creating abstract art with my fur",
  "I'm not stubborn, I'm just committed to my decisions",
  "I'm not pouting, I'm reflecting on the mysteries of life",
  "I'm not hiding, I'm conducting top-secret cat business",
  "I'm not annoyed, I'm simply unimpressed",
  "I'm not needy, I just expect worship",
  "I'm not small, I'm just conserving space",
  "I'm not slow, I'm practicing patience...for food",
  "I'm not ignoring you, I’m just selectively attentive",
  "I'm not bored, I'm plotting world domination",
  "I'm not chasing the laser, I’m training for the Olympics"
]

const catJokesAndFacts = [
  { type: 'joke', content: "Why don't cats play poker in the jungle? Too many cheetahs!" },
  { type: 'fact', content: "Cats can't taste sweetness." },
  { type: 'joke', content: "What do you call a cat that's a pickpocket? A purr-se snatcher!" },
  { type: 'fact', content: "A group of cats is called a 'clowder'." },
  { type: 'joke', content: "What do you call a cat that's a ghost? Claw-tergeist!" },
  { type: 'fact', content: "Cats spend 70% of their lives sleeping." },
  { type: 'joke', content: "Why did the cat join Instagram? To become an influ-purr-cer!" },
  { type: 'fact', content: "A cat's nose print is unique, like a human's fingerprint." },
  { type: 'joke', content: "What do you call a cat magician? Houdini-mew!" },
  { type: 'fact', content: "Cats can jump up to six times their length." },
  { type: 'joke', content: "Why did the cat sit on the computer? To keep an eye on the mouse!" },
  { type: 'fact', content: "A cat’s whiskers are roughly as wide as its body." },
  { type: 'joke', content: "How do cats end a fight? They hiss and make up!" },
  { type: 'fact', content: "Cats walk like camels and giraffes, moving both legs on one side before the other." },
  { type: 'joke', content: "Why was the cat sitting on the copy machine? To make paw-traits!" },
  { type: 'fact', content: "The oldest known pet cat existed 9,500 years ago." },
  { type: 'joke', content: "What do cats like to eat on hot days? Mice cream!" },
  { type: 'fact', content: "Cats have 32 muscles that control their outer ears." },
  { type: 'joke', content: "Why was the cat such a great singer? Because it had purr-fect pitch!" },
  { type: 'fact', content: "A cat’s purring can promote healing and reduce stress." }
]

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export function WobblingCatGalleryComponent() {
  const [seed, setSeed] = useState(0)
  const [shuffledContent, setShuffledContent] = useState<(string | typeof catJokesAndFacts[0])[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setSeed(Math.random())
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const allContent = [...catImages, ...catJokesAndFacts]
    setShuffledContent(shuffleArray(allContent))
  }, [])

  const getRandomWobble = () => ({
    x: Math.sin(seed * 10) * 10,
    y: Math.cos(seed * 10) * 10,
    rotate: Math.sin(seed * 5) * 5,
  })

  const getRandomJump = () => ({
    x: (Math.random() - 0.5) * 500,
    y: (Math.random() - 0.5) * 500,
    transition: { duration: 0.5 },
  })

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-purple-600"
        animate={getRandomWobble()}
      >
        The Wobbling Cat Gallery of Chaos
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shuffledContent.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg"
            animate={getRandomWobble()}
            whileHover={getRandomJump()}
          >
            {typeof item === 'string' ? (
              <>
                <motion.img
                  src={item}
                  alt={`Cat ${index + 1}`}
                  className="w-full h-48 object-cover mb-4 rounded"
                  animate={getRandomWobble()}
                />
                <motion.p
                  className="text-lg font-semibold text-gray-800"
                  animate={getRandomWobble()}
                >
                  {funnyCaptions[index % funnyCaptions.length]}
                </motion.p>
              </>
            ) : (
              <motion.div
                className={`h-full flex flex-col justify-center items-center text-black ${
                  item.type === 'joke' ? 'bg-yellow-100' : 'bg-blue-100'
                } p-4 rounded`}
                animate={getRandomWobble()}
              >
                <h3 className="text-xl font-bold mb-2">{item.type === 'joke' ? 'Cat Joke' : 'Cat Fact'}</h3>
                <p className="text-center">{item.content}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <motion.button
        className="mt-8 px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center"
        animate={getRandomWobble()}
        whileHover={getRandomJump()}
        onClick={() => setShuffledContent(shuffleArray([...shuffledContent]))}
      >
        <Shuffle className="mr-2" />
        Shuffle the Cat-astrophe!
      </motion.button>
      <motion.p
        className="mt-8 text-center text-gray-600"
        animate={getRandomWobble()}
      >
        Warning: These cats may cause uncontrollable laughter and severe dizziness!
      </motion.p>
    </div>
  )
}