function calculateCalories(gender, weight, height, age, activityLevel) {
    let BMR = 0;
    let AMR = 0;

    if(gender == "male"){
        BMR = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    }
    else if(gender == "female"){
        BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
    }

    if(activityLevel == "sedentary"){
        AMR = BMR * 1.2;
    }
    else if(activityLevel == "light"){
        AMR = BMR * 1.375;
    }
    else if(activityLevel == "moderate"){
        AMR = BMR * 1.55;
    }
    else if(activityLevel == "active"){
        AMR = BMR * 1.725;
    }
    else if(activityLevel == "very"){
        AMR = BMR * 1.9;
    }

    const dailyCalories = AMR;

    return dailyCalories;
}