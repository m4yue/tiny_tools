for i in `ls *.jpg`;do c=$(date -r $i "+%Y_%m%d_%H%M%S");echo mv $i $c;done

img_counter=100

for i in *;do exiv2 -t -r"%Y_%m%d_%H%M%S_$img_counter" rename "$i" || mv "$i" $(date -r "$i" "+%Y_%m%d_%H%M%S_$img_counter").${i##*.};((img_counter++));done
for i in *;do exiv2 -t -r"%Y_%m%d_%H%M%S_$img_counter" rename "$i" || mv "$i" $(date -r "$i" "+%Y_%m%d_%H%M%S_$img_counter").${i##*.};((img_counter++));done
exiv2 -t -r"%Y_%m%d_%H%M%S" rename aa.jpg

IMG_20150628_124957.jpg

# use adb to fetch itofoo files to pc
adb pull /sdcard/Android/data/com.zeon.guardiancare/files/photos ./
adb pull /sdcard/DCIM ./



