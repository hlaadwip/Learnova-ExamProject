import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/OnboardingStyles';
import { Colors } from '../../styles/Colors';

const { width, height } = Dimensions.get('window'); 

const OnboardingScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title1: "Stay Focused While",
      title2: "Studying",
      desc: "Prepare for UTBK and TKA with structured materials designed to help you stay focused.",
      image: require('../../assets/onboarding1.png'),
      imageStyle: {
        width: width * 1.3,
        height: height * 0.45,
        marginBottom: -40,
      }
    },
    {
      title1: "Exam-Ready",
      title2: "Materials",
      desc: "Access essential Grade 12 materials anytime, built to support your exam preparation.",
      image: require('../../assets/onboarding2.png'),
      imageStyle: {
        width: width * 0.85,
        height: height * 0.4,
        marginBottom: -20,
      }
    },
    {
      title1: "Start Your",
      title2: "Journey",
      desc: "Build better study habits and take one step closer to your goals with Learnova today.",
      image: require('../../assets/onboarding3.png'),
      imageStyle: {
        width: width * 1.2,
        height: height * 0.45,
        marginBottom: -50,
      }
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.skipWrapper}>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageWrapper}>
        <Image 
          key={currentSlide}
          source={slides[currentSlide].image} 
          style={[
            styles.image, 
            {
              width: currentSlide === 0 ? width * 1.5 : 
                     currentSlide === 1 ? width * 1.9 :
                     width * 0.9,                       

              height: currentSlide === 1 ? height * 0.6 : height * 0.45,
              alignSelf: currentSlide === 1 ? 'flex-start' : 'center',
              marginLeft: currentSlide === 1 ? -175 : 0, 
              marginBottom: currentSlide === 1 ? -10 : 
                            currentSlide === 0 ? -45 : -55,
            }
          ]} 
        />
      </View>

      <View style={styles.bottomCard}>
        <View>
          <Text style={styles.titleBlack}>{slides[currentSlide].title1}</Text>
          <Text style={styles.titleBlue}>{slides[currentSlide].title2}</Text>
          <Text style={styles.description}>{slides[currentSlide].desc}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View 
                key={index} 
                style={[styles.dot, currentSlide === index && styles.activeDot]} 
              />
            ))}
          </View>

          <View style={styles.nextButtonContainer}>
            <View style={[
              styles.progressRing, 
              { 
                borderRightColor: currentSlide >= 1 ? Colors.primary : '#D1E4FF',
                borderBottomColor: currentSlide === 2 ? Colors.primary : '#D1E4FF' 
              } 
            ]} />
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
               <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;