const WazeMap = () => {
  // 📍 Coordonnées de Bruxelles (bien centrée)
  const latitude = 50.8503;
  const longitude = 4.3517;

  // 🔍 Zoom ajusté pour voir toute la région bruxelloise
  const wazeUrl = `https://embed.waze.com/iframe?zoom=12&lat=${latitude}&lon=${longitude}`;

  return (
    <div className="w-full h-[700px] rounded-lg shadow-lg overflow-hidden">
      <iframe
        src={wazeUrl}
        width="100%"
        height="100%"
        allowFullScreen
        title="Carte Waze - Bruxelles"
      ></iframe>
    </div>
  );
};

export default WazeMap;
