import React, { useState } from 'react'
import bookVideo from "../Assets/book-video.mp4";
import features from '../Data/Features';
import { Card, Title, Badge, List, SimpleGrid, AspectRatio } from '@mantine/core'
import { IconRosetteDiscountCheck } from "@tabler/icons-react";



const About = () => {
  const [expanded, setExpanded] = useState(false);
  const visibleFeatures = expanded ? features : features.slice(0, 4);

  return (
    <div id="about" className="py-16 w-full flex flex-col items-center justify-center">
      <Card
        shadow="sm"
        padding="xl"
        radius="md" withBorder className='w-[80%] bg-gradient-to-r from-violet-50 to-violet-100'>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <div>
            <Title order={2}
              className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-emerald-500 to-cyan-950 bg-clip-text text-transparent text-center md:text-left">
              Built for Readers Who Love Exploring...
            </Title>
            <AspectRatio ratio={3 / 2} className="mt-4 max-w-[320px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] mx-auto">
              <video
                className="rounded-lg object-contain bg-black"
                src={bookVideo}

                autoPlay
                muted
                loop
                playsInline
              />
            </AspectRatio>
            <div className="mt-3 flex justify-center md:justify-start">
              <Badge size="sm" color="orange">
                Explore the Features
              </Badge>
            </div>
          </div>
          <div>
            <div
              className={`mt-3 max-h-96 transition-all duration-300
    ${expanded ? "overflow-y-auto" : "overflow-hidden"}
  `}
            >
              <List spacing="xs" mt="md" mr="md" icon={
                <IconRosetteDiscountCheck
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4"
                  color="orange"
                />
              }>
                {visibleFeatures.map((item, index) => (
                  <List.Item key={index}>
                    <strong className="block leading-tight text-xs sm:text-sm md:text-sm" >{item.title}:</strong>
                    <p className="mt-1 text-[11px] sm:text-sm md:text-base leading-snug sm:leading-relaxed text-gray-600">{item.content}</p>
                  </List.Item>

                ))}
              </List>

            </div>
            <span
              onClick={() => setExpanded(!expanded)}
              className="mt-3 flex justify-end inline-block text-orange-600 underline font-semibold cursor-pointer"
            >
              {expanded ? "Show Less" : "Learn More"}
            </span>
          </div>
        </SimpleGrid>
      </Card>
      <p className="mt-4 text-gray-400 text-xs sm:text-sm text-center">
        Thanks for visiting Book Hunt! We appreciate your support.
      </p>
    </div>

  )
}

export default About;