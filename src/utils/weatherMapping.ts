import { Sun, Moon, CloudSun, CloudMoon, Cloud, CloudFog, CloudDrizzle, CloudRain, Snowflake, CloudLightning } from 'lucide-react';

export function getWeatherIcon(code: number, isDay: boolean | number = true) {
  const day = Boolean(isDay);
  switch (code) {
    case 0: return day ? Sun : Moon;
    case 1:
    case 2: return day ? CloudSun : CloudMoon;
    case 3: return Cloud;
    case 45:
    case 48: return CloudFog;
    case 51: case 53: case 55:
    case 56: case 57: return CloudDrizzle;
    case 61: case 63: case 65:
    case 66: case 67:
    case 80: case 81: case 82: return CloudRain;
    case 71: case 73: case 75:
    case 77:
    case 85: case 86: return Snowflake;
    case 95: case 96: case 99: return CloudLightning;
    default: return day ? Sun : Moon;
  }
}

export function getWeatherDescription(code: number) {
  switch (code) {
    case 0: return 'Clear sky';
    case 1: return 'Mainly clear';
    case 2: return 'Partly cloudy';
    case 3: return 'Overcast';
    case 45: case 48: return 'Fog';
    case 51: case 53: case 55: return 'Drizzle';
    case 56: case 57: return 'Freezing Drizzle';
    case 61: return 'Slight rain';
    case 63: return 'Moderate rain';
    case 65: return 'Heavy rain';
    case 66: case 67: return 'Freezing Rain';
    case 71: return 'Slight snow';
    case 73: return 'Moderate snow';
    case 75: return 'Heavy snow';
    case 77: return 'Snow grains';
    case 80: case 81: case 82: return 'Rain showers';
    case 85: case 86: return 'Snow showers';
    case 95: return 'Thunderstorm';
    case 96: case 99: return 'Thunderstorm with hail';
    default: return 'Unknown';
  }
}
