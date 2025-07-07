import React, { useEffect, useState } from "react";

interface WeatherData {
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  humidity: number;
  wind_kph: number;
}

interface HourData {
  time: string;
  temp_c: number;
  condition: {
    icon: string;
  };
}

export const WeatherApp = () => {
  const [city, setCity] = useState("Hanoi");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<HourData[]>([]);

  const API_KEY = "c9a0ca46550648b29ce125849232709";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
            city
          )}&days=1&aqi=no&alerts=no&lang=vi`
        );
        const data = await res.json();

        // Kiểm tra trước khi dùng
        if (
          data &&
          data.current &&
          data.forecast &&
          data.forecast.forecastday
        ) {
          setWeather(data.current);

          const currentHour = new Date().getHours();
          const hourly = data.forecast.forecastday[0].hour.slice(
            currentHour,
            currentHour + 4
          );

          setForecast(hourly);
        } else {
          console.error("Không tìm thấy dữ liệu hợp lệ:", data);
          setWeather(null);
          setForecast([]);
        }
      } catch (err) {
        console.error("Lỗi khi fetch thời tiết:", err);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-300 to-blue-100">
      <div className="w-[360px] p-4 rounded-xl text-gray-800 font-sans">
        {/* Tìm kiếm */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 rounded-full text-lg text-center bg-white/40 placeholder-white focus:outline-none mb-6"
          placeholder="Hanoi"
        />

        {/* Hiển thị thời tiết */}
        {weather && (
          <>
            <div className="flex justify-between items-center px-4">
              <div>
                <h1 className="text-[64px] font-light">{weather.temp_c}°</h1>
                <p className="text-2xl font-semibold">
                  {weather.condition.text}
                </p>
              </div>
              <img
                src={weather.condition.icon}
                alt="weather icon"
                className="w-20 h-20"
              />
            </div>

            {/* Độ ẩm và Gió */}
            <div className="mt-6 bg-white/40 rounded-2xl p-4 flex justify-between text-center text-gray-700">
              <div className="w-1/2 border-r border-gray-300">
                <p className="text-sm">Độ ẩm</p>
                <p className="text-2xl font-bold">{weather.humidity}%</p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">Gió</p>
                <p className="text-2xl font-bold">{weather.wind_kph} km/h</p>
              </div>
            </div>
          </>
        )}

        {/* Dự báo giờ */}
        <div className="mt-6 bg-white rounded-2xl p-4 text-center shadow-md">
          <p className="text-gray-700 font-medium mb-4 text-left">Dự báo giờ</p>
          <div className="flex justify-between items-center">
            {forecast.map((hour, index) => (
              <div key={index} className="text-center">
                <img
                  src={hour.condition.icon}
                  alt="icon"
                  className="w-8 h-8 mx-auto"
                />
                <p className="text-lg font-semibold">{hour.temp_c}°</p>
                <p className="text-sm text-gray-600">
                  {index === 0 ? "Now" : hour.time.split(" ")[1].slice(0, 5)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
