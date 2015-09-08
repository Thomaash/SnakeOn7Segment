#!/bin/zsh

cd "/home/tom/soubory/Workplace/IDEA/SnakeOn7Segment/Graphics/game/leds"

src="160"

cd "$src"
for file in *; do
	for i in 120 80 40; do
		dir="../$i"
		mkdir -p "$dir"
		
		if [[ $( echo "$file" | cut -c1 ) == "h" ]]; then
			size="$i"
		else
			size="x$i"
		fi
		
		convert "$file" -resize "$size" -quality 0 "$dir/$file"
	done
done
