import Image from 'next/image';
import { motion } from 'framer-motion';

interface SummaryStatsPageProps {
  stats: {
    totalConversations: number;
    totalMessages: number;
    streaks: {
      longest: number;
    };
    sentiment: {
      swearCount: number;
      gratitudeCount: number;
    };
    topics: {
      distribution: {
        [key: string]: number;
      };
    };
    dailyStats: {
      mostChatsInOneDay: number;
    };
    longestConversation: {
      messageCount: number;
    };
  };
}

export default function SummaryStatsPage({ stats }: SummaryStatsPageProps) {
  // Get top topic
  const topTopic = Object.entries(stats.topics.distribution)
    .sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="h-full flex flex-col">
      <div className="w-full h-1/4 relative">
        <Image
          src="/summary/top.png"
          alt="Top decorative pattern"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        <div className="text-center space-y-8 relative z-10 w-full max-w-2xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Your 2024 ChatGPT Journey</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-3xl font-bold text-white">{stats.totalConversations}</p>
              <p className="text-sm text-gray-300">Total Chats</p>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-3xl font-bold text-white">{stats.totalMessages}</p>
              <p className="text-sm text-gray-300">Messages Exchanged</p>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-3xl font-bold text-white">{stats.streaks.longest}🔥</p>
              <p className="text-sm text-gray-300">Longest Daily Streak</p>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-3xl font-bold text-white">{stats.dailyStats.mostChatsInOneDay}</p>
              <p className="text-sm text-gray-300">Most Active Day</p>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-3xl font-bold text-white">{stats.longestConversation.messageCount}</p>
              <p className="text-sm text-gray-300">Longest Chat (messages)</p>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-3xl font-bold text-white">{topTopic[0]}</p>
              <p className="text-sm text-gray-300">Most Common Topic</p>
            </motion.div>
          </div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className="text-2xl font-bold text-white mb-4">Are you safe from AGI?</p>
            {(() => {
              const ratio = stats.sentiment.gratitudeCount / (stats.sentiment.swearCount || 1);
              if (ratio >= 5) return (
                <p className="text-xl text-green-400">You are safe.</p>
              );
              if (ratio >= 2) return (
                <p className="text-xl text-yellow-400">Safe, for now...</p>
              );
              if (ratio >= 1) return (
                <p className="text-xl text-orange-400">Don&apos;t turn your back.</p>
              );
              return (
                <p className="text-xl text-red-400">AGI is coming for you.</p>
              );
            })()}
          </motion.div>
        </div>
      </div>
      <div className="w-full h-1/4 relative">
        <Image
          src="/summary/bottom.png"
          alt="Bottom decorative pattern"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
} 