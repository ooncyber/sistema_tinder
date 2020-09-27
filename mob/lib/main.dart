import 'package:flutter/material.dart';
import 'modules/home/home.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized();

  runApp(
    MaterialApp(
      home: Home(),
      debugShowCheckedModeBanner: false,
    ),
  );
}
