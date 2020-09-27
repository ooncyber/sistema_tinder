import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Home extends StatelessWidget {
  init() async {
    SystemChrome.setEnabledSystemUIOverlays([]);
    var shared = await SharedPreferences.getInstance();
    if(shared.containsKey('token'))
      var token = shared.getString('token');
  }

  @override
  Widget build(BuildContext context) {
    init();

    return Scaffold(
        body: Container(
      child: Text("Home"),
    ));
  }
}
