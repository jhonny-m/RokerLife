DrawLayer = function(layerData, ctx, mapSize, tileSize,sprite){
	var spriteSize = Vector2D(sprite.width/tileSize.x, sprite.height/tileSize.y);
	for(i=0; i<layerData.length; i++){
		if (layerData[i]!=0){
			var spritePosition = Vector2D(((layerData[i]-1)% spriteSize.x)*tileSize.x, ~~((layerData[i]-1)/ spriteSize.x)*tileSize.x)
			var canvasPosition = Vector2D((i % mapSize.x)*tileSize.x, ~~(i/ mapSize.x)*tileSize.y);
			ctx.drawImage(sprite,spritePosition.x,spritePosition.y,tileSize.x,tileSize.y,canvasPosition.x,canvasPosition.y,tileSize.x,tileSize.y);
		}
		
	}
}