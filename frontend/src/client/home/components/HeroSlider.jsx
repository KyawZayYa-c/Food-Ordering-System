import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Text,
  Button,
  Group,
  Badge,
  Stack,
  Title,
  ThemeIcon,
  useMantineTheme,
  Image,
  Overlay,
  Skeleton,
  Paper,
  ActionIcon,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconArrowRight,
  IconStar,
  IconTruck,
} from '@tabler/icons-react';
import { HERO_SLIDES } from './HERO_SLIEDES';



function SlideContent({ slide, isMobile }) {
  const theme = useMantineTheme();

  return (
    <Box
      pos="relative"
      h={isMobile ? 400 : 550}
      style={{ 
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        background: theme.colors.gray[9],
      }}
    >
      <Image
        src={slide.image}
        alt={slide.title}
        w="100%"
        h="100%"
        fit="cover"
      />

      <Overlay
        gradient={`linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)`}
        zIndex={1}
      />

      <Container
        size="xl"
        pos="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          zIndex: 2,
          padding: isMobile ? '50px' : '90px',
        }}
      >
        <Stack
          gap={isMobile ? 'sm' : 'md'}
          w={isMobile ? '100%' : '75%'}
          style={{ color: 'white' }}
        >
          {slide.badge && (
            <Badge
              size={isMobile ? 'sm' : 'lg'}
              color={slide.badgeColor || 'red'}
              variant="filled"
              style={{ alignSelf: 'flex-start' }}
            >
              {slide.badge}
            </Badge>
          )}

          {slide.discount && (
            <Badge
              size={isMobile ? 'md' : 'xl'}
              color="yellow"
              variant="filled"
              style={{
                alignSelf: 'flex-start',
                background: 'linear-gradient(135deg, #f7971e, #ffd200)',
                color: '#000',
                fontWeight: 800,
              }}
            >
              {slide.discount}
            </Badge>
          )}

          <Title
            order={isMobile ? 2 : 1}
            c="white"
            fz={isMobile ? 28 : 52}
            fw={800}
            lh={1.1}
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            {slide.title}
          </Title>

          <Text
            c="white"
            fz={isMobile ? 16 : 24}
            fw={600}
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            {slide.subtitle}
          </Text>

          {!isMobile && (
            <Text
              fz={16}
              lh={1.6}
              maw="90%"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              {slide.description}
            </Text>
          )}

          <Group gap="xl" mt="xs">
            <Group gap="xs">
              <ThemeIcon color="yellow" size={isMobile ? 'sm' : 'md'} variant="light">
                <IconStar size={isMobile ? 14 : 18} />
              </ThemeIcon>
              <Text size={isMobile ? 'sm' : 'md'} fw={600} c="white">
                {slide.rating}
              </Text>
            </Group>
            <Group gap="xs">
              <ThemeIcon color="blue" size={isMobile ? 'sm' : 'md'} variant="light">
                <IconTruck size={isMobile ? 14 : 18} />
              </ThemeIcon>
              <Text size={isMobile ? 'sm' : 'md'} c="white">
                {slide.deliveryTime}
              </Text>
            </Group>
            <Group gap="xs">
              <Text size={isMobile ? 'sm' : 'md'} style={{ color: 'rgba(255,255,255,0.7)' }}>
                {slide.orders}+ orders
              </Text>
            </Group>
          </Group>

          <Group mt="md">
            <Button
              size={isMobile ? 'md' : 'lg'}
              color={slide.color || 'blue'}
              rightSection={<IconArrowRight size={isMobile ? 18 : 22} />}
              radius="xl"
              fw={700}
              fz={isMobile ? 14 : 18}
              px={isMobile ? 24 : 36}
              py={isMobile ? 8 : 12}
              styles={{
                root: {
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
                  },
                },
              }}
            >
              {slide.buttonText}
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}

export default function HeroSlider() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loading]);

  const goToSlide = (index) => setCurrentSlide(index);
  const goToPrev = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);

  if (loading) {
    return (
      <Box mb="xl">
        <Skeleton h={isMobile ? 400 : 550} radius="md" />
      </Box>
    );
  }

  return (
    <Box mb="xl" pos="relative">
      <Paper
        radius="md"
        shadow="md"
        style={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <SlideContent slide={HERO_SLIDES[currentSlide]} isMobile={isMobile} />

        {!isMobile && (
          <>
            <ActionIcon
              onClick={goToPrev}
              pos="absolute"
              left={20}
              top="50%"
              style={{
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </ActionIcon>
            <ActionIcon
              onClick={goToNext}
              pos="absolute"
              right={20}
              top="50%"
              style={{
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </ActionIcon>
          </>
        )}

        <Group
          pos="absolute"
          bottom={30}
          left="50%"
          style={{
            transform: 'translateX(-50%)',
            zIndex: 10,
            gap: 8,
          }}
        >
          {HERO_SLIDES.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: currentSlide === index ? 30 : 12,
                height: 12,
                borderRadius: currentSlide === index ? 6 : '50%',
                background: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </Group>
      </Paper>
    </Box>
  );
}