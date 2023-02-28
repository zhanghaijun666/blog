#!bin/sh
for file in *.html
do
  title=`grep "title" $file | sed 's/<title>\(.*\)<\/title>/\1/g' | awk '$1=$1'`
  name=`echo $file | sed 's/\(.*\).html/\1/g' | awk '$1=$1'`
  mv -- "$file" "$title-$name.html"
done
