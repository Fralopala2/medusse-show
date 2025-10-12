import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'providers/sensor_provider.dart';
import 'models/sensor_data.dart';
import 'screens/home_screen.dart';
import 'screens/location_detail_screen.dart';
import 'screens/sensor_chart_screen.dart';

void main() {
  runApp(const MedusseApp());
}

class MedusseApp extends StatelessWidget {
  const MedusseApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => SensorProvider())],
      child: MaterialApp(
        title: 'Medusse IoT',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFF2196F3),
            brightness: Brightness.light,
          ),
          textTheme: GoogleFonts.interTextTheme(),
          appBarTheme: AppBarTheme(
            centerTitle: true,
            elevation: 0,
            backgroundColor: Colors.transparent,
            foregroundColor: Colors.black87,
            titleTextStyle: GoogleFonts.inter(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: Colors.black87,
            ),
          ),
          cardTheme: CardThemeData(
            elevation: 2,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              elevation: 0,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
        ),
        darkTheme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFF2196F3),
            brightness: Brightness.dark,
          ),
          textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme),
          appBarTheme: AppBarTheme(
            centerTitle: true,
            elevation: 0,
            backgroundColor: Colors.transparent,
            titleTextStyle: GoogleFonts.inter(
              fontSize: 20,
              fontWeight: FontWeight.w600,
            ),
          ),
          cardTheme: CardThemeData(
            elevation: 2,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
        home: const HomeScreen(),
        routes: {
          '/location': (context) => const LocationDetailScreen(),
          '/chart': (context) => const SensorChartScreen(),
        },
      ),
    );
  }
}

// Colores personalizados para la app
class AppColors {
  static const Color primary = Color(0xFF2196F3);
  static const Color secondary = Color(0xFF03DAC6);
  static const Color error = Color(0xFFB00020);
  static const Color warning = Color(0xFFFF9800);
  static const Color success = Color(0xFF4CAF50);

  // Colores para sensores
  static const Color temperature = Color(0xFFFF5722);
  static const Color humidity = Color(0xFF2196F3);
  static const Color co2 = Color(0xFF4CAF50);
  static const Color pressure = Color(0xFF9C27B0);

  // Colores para ubicaciones
  static const Color aula20 = Color(0xFFE53E3E);
  static const Color aula21 = Color(0xFF3182CE);
  static const Color laboratorio = Color(0xFF38A169);
}

// Extensiones útiles
extension SensorTypeColors on SensorType {
  Color get color {
    switch (this) {
      case SensorType.temperature:
        return AppColors.temperature;
      case SensorType.humidity:
        return AppColors.humidity;
      case SensorType.co2:
        return AppColors.co2;
      case SensorType.pressure:
        return AppColors.pressure;
    }
  }

  IconData get icon {
    switch (this) {
      case SensorType.temperature:
        return Icons.thermostat;
      case SensorType.humidity:
        return Icons.water_drop;
      case SensorType.co2:
        return Icons.air;
      case SensorType.pressure:
        return Icons.compress;
    }
  }
}

extension LocationColors on String {
  Color get locationColor {
    switch (toLowerCase()) {
      case 'aula20':
        return AppColors.aula20;
      case 'aula21':
        return AppColors.aula21;
      case 'laboratorio':
        return AppColors.laboratorio;
      default:
        return AppColors.primary;
    }
  }
}
