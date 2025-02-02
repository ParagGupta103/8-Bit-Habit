levels_xp_caps = [5,8,11,14,17,20] # when new sidequest, increase cap for level for specific class
sidequest_days = [4,8,12,16,20] #days when you include new sidequests
GB_xp,AW_xp,DA_xp = 0,0,0
GB_cap_point,AW_cap_point,DA_cap_point = 0,0,0
GB_sidequests,AW_sidequests,DA_sidequests = 0,0,0
GB_side_point,AW_side_point,DA_side_point = 0,0,0

GB_main,AW_main,DA_main = 1,1,1

sidequests_count_total = 0


GB_level,AW_level,DA_level = 1,1,1
GB_bool,Aw_bool,DA_bool = True,False,False
#class_count = 1


#when main quest is done, side quest gives 3 points
GB_xp += 5 # 5 points for main quest
if GB_xp >= levels_xp_caps[GB_cap_point]: # moves to next level
    print("Yay level up!!")
    GB_level += 1
    GB_cap_point += 1 
if GB_level <= sidequest_days[GB_side_point]: # basically if you reach a day 
    GB_side_point += 1
    GB_sidequests += 1













