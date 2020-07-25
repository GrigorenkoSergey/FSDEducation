# FSDEducation-second-task
## [Результат](https://grigorenkosergey.github.io/Second_Task/index.html)

## Установка и возможные проблемы
Клонируй одним из возможных способов:  
`git clone https://github.com/GrigorenkoSergey/FSDEducation-second-task.git`  
`git clone git@github.com:GrigorenkoSergey/FSDEducation-second-task.git`  
Или просто скачай [ZIP архив](`https://github.com/GrigorenkoSergey/FSDEducation-second-task/archive/master.zip`).

Развертывание. Зайди в установленную директорию (*FSDEducation-second-task*) и выполни команду
`npm install`  
Если выдаст ошибку, попробуй переустановить ***babel-loader*** командами  
`npm uninstall babel-loader @babel/core @babel/preset-env`  
`npm install -D babel-loader @babel/core @babel/preset-env`

Запуск webpack-dev-server  
`npm run dev`  
Запуск production build  
`npm run build`

## Структура проекта
```
.
├── dist
├── node_modules
├── src
|   ├── assets
|   |   ├── blocks
|   |   ├── fonts
|   |   └── images
|   |
|   ├── favicons
|   |
|   └── pages
|   |   ├── UI-Kit
|   |   |   ├── cards
|   |   |   |── colors-and-type
|   |   |   ├── form-elements
|   |   |   └── headers-and-footers
|   |   | 
|   |   └── Website-pages
|   |       ├── landing-page
|   |       ├── registration
|   |       ├── room-details
|   |       ├── search-room
|   |       └── sign-in
|   |
|   ├── index.js
|   ├── index.pug
|   ├── postcss.config.js
|   └── screens.txt
|   
├── README.md
├── package.json
├── webpack.dev.config.js
└── webpack.prod.config.js
```
**Примечания:**  
В файле ***screens.txt*** я занес размеры экранов, которые я учитывал в проекте.
Картинки, которые относятся к блокам должны будут содержаться непосредственно в папке images
каждого блока.  
Картинки, которые относятся не к блоку, а к непосредственно сайту, будем складывать в 
папку  
***src/assets/images/(UI-Kit)|(Website-pages)/some_page/image.png***.  
Связано это с настройками (точнее с их отсутствием) ***file-loader*** моего webpack.
Все пути к файлам картинок, шрифтов, т.е. те, что содержат ***url()*** мы подключаем одним из двух 
возможных способов:  
`url("assets/blocks/[block_name]/images/[image_name].[ext]` для картинок блоков,  
`url("assets/images/[UI-Kit | Website-pages]/[page_name]/[image_name].[ext]`).  
Некоторые принципы, которых я придерживался в проекте при создании блоков, я записал в раздел *src/assets/blocks/readme*.