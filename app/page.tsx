'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import WelcomePage from '../components/story-pages/WelcomePage';
import TotalStatsPage from '../components/story-pages/TotalStatsPage';
import StreakStatsPage from '../components/story-pages/StreakStatsPage';
import TimeStatsPage from '../components/story-pages/TimeStatsPage';
import LandingPage from '../components/LandingPage';

const Stories = dynamic(() => import('../components/Stories'), { ssr: false })

interface WrappedData {
  processed: boolean;
  stats?: {
    totalConversations: number;
    totalMessages: number;
    dateRange: {
      start: string;
      end: string;
    };
    streaks: {
      longest: number;
      current: number;
      startDate: string;
    };
    longestConversation: {
      messageCount: number;
      date: string;
      title: string;
    };
    dailyStats: {
      mostChatsInOneDay: number;
      date: string;
    };
    timeOfDay: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
  };
}

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState<WrappedData | null>(null);

  const handleDataReady = (parsedData: WrappedData) => {
    setData(parsedData);
    setIsReady(true);
  };

  const stories = [
    {
      component: <WelcomePage />,
    },
    {
      component: data?.stats ? <TotalStatsPage stats={data.stats} /> : null,
    },
    {
      component: data?.stats ? <StreakStatsPage stats={data.stats} /> : null,
    },
    {
      component: data?.stats ? <TimeStatsPage stats={data.stats} /> : null,
    },
  ];

  if (!isReady) {
    return <LandingPage onDataReady={handleDataReady} />;
  }

  return (
    <main className="h-screen w-screen overflow-hidden">
      <Stories stories={stories} />
    </main>
  );
}
