/*jslint es6*/
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
var http = require('http');
var Router = require('router');
var finalhandler = require('finalhandler');
console.log(process.env.app_token);
client.login(process.env.app_token);

var servers = [];
var foodwords = ['recipe', 'ramen', 'cake', 'pie', 'stew', 'cakes', 'pies', 'macaron', 'macarons', 'udon', 'pork', 'chicken', 'turkey', 'sushi', 'sashimi', 'curry', 'naan', 'bao', 'dumpling', 'shumai', 'gyoza', 'katsu', 'tempura', 'taco', 'burrito', 'enchiladas', 'flan', 'custard', 'breakfast', 'lunch', 'supper', 'dinner', 'brunch', 'flatbread', 'rice', 'beans', 'bean', 'spaghetti', 'ravioli', 'cascatelli', 'pappardelle', 'rigatoni', 'farfalle', 'macaroni', 'fettucine', 'gnocchi', 'tortellini', 'orechiette', 'onion', 'broccoli', 'kale', 'spinach', 'carrot', 'potato', 'egg', 'scallion', 'vinegar', 'sugar', 'pepper', 'msg', 'noodle', 'noodles', 'cereal', 'poptart', 'croissant', 'cruller', 'donut', 'doughnut', 'pea', 'edamame', 'apple', 'peach', 'pear', 'plum', 'banana', 'grape', 'casserole', 'yogurt', 'steak', 'granola', 'salad', 'appetizer', 'dessert', 'milkshake', 'popcorn', 'charcuterie', 'chili', 'eggs', 'bento', 'lunchbox', 'apizza', 'pho', 'jello', 'jelly', 'peanut', 'almond', 'cashew', 'pasta', 'grain', 'fruit', 'meat', 'vegetable', 'candy'];
var responses = ['Oh that sounds very yummy!', 'Can I have a bite of that please thank you so much.', 'I would like to try some of that if you do not mind very much thank you.', 'That looks so delicious! Amazing!', 'Do you think maybe if you have any leftovers I could maybe try some of that please?', 'Thank you for talking about food I think food is something we should talk about a lot you are very smart.', 'It\'s a good thing you are mentioning food right now I was getting hungry and now I am going to find some more food thank you...', '... ... ... ... Do you have any of that to share?', 'Oh that is a very good food! Is it your favorite food? My favorite food is... sushi... no... maybe it is tacos... oh, but chili is very good too... oh no, there are so many stews...', 'I think maybe you should have more of that food and then maybe if there is some left over you can share it with me that would be very nice thank you in advance!', 'I can help if you do not want to eat all of that food it is a service I will help with for free I do not charge at all.', 'Did you know Gulpins can eat all kinds of foods? Even that kind!', 'To eat a food... the greatest experience of life...', 'I am thinking maybe if you have your food and maybe someone else gets some food we can have a picnic? And I can come along and be very helpful and pick up all the food that is left over and eat it, maybe?', 'I love food... and I love you too! But also I really have to be honest I love food so much.', 'Did you know that one in every seven shishito peppers will be extra spicy? It is like a goch-cha of foods I think.', 'Do you ever wonder just how many different spices are in the world? I have counted all of the spices at every grocery store I ever went to and it is at least 132. I think there are probably more though!', 'Shnork... mimimimimimimi... shnork... mimimimimimimimi... -snrk- Oh! Oh no I took a nap and now you are talking about food and I might have missed part of when you were talking about food. Did you mention soup at all? Or broth, even? What about stocks? Oh, no...!', 'Food, glorious food... Um... something... lyrics... um, food...', 'Today at Gulpin School For Gulpins I learned that you can exchange money for food. Do you think maybe they should put a burger on the... five... dollars? And maybe a pizza on the twenty dollars? Oh, oh, and maybe a french fries on the one dollars. That would be helpful I think for remembering.', 'If music be the food of love, what is the food of like? Or the food of friendship? Oh, I would love to eat the food of friendship I think it would taste the best ever maybe!', '... ... ... ... ... ... ... Oh! Oh I am so sorry I was not paying attention. I was just thinking about the forbidden rice...', 'That sounds like a very tasty and nutritious and filling and comforting and flavorful and satisfying food and I hope you have a good time eating it and also I was wondering if I could try some?', 'Yum! Yum yum yum! That sounds great!!!', 'I think I would like to try that if that is okay!', 'Thank you for talking about that one... One of the all time foods of all time...', 'I just think it is very interesting that you are eating that and not mentioning whether there are leftovers or not...', 'Did you drop any of that on the floor? I am really really really really really good at helping pick up food from off of the floor it is one of my "markid-ubble skills".', 'Oh!! Oh thank you for mentioning that!!! One time my friend Goomy and I got to eat that food and when we tasted it it was like a flavor explosion and it was so good we sang a song about it. Do you want to hear the song? Okay it goe -- Wait that smells really yummy can I have some first?', 'That\'s a good one!', 'I want some of that please!', 'Oh... yummo...'];
var bonuses = [
    {word: 'tuna', response: 'tuuuuuuna... honk... mimimimi... snnnzz... tuuuna... tuuuna... ... -snrk- TUNA?! TUUUNA!! TUUUUNA!!! TUNA ALARM!!!! TUNA ALARM!!!!!'}, 
    {word: 'pizza', response: 'Pi Pi Pi! Pizza Pizza Pizza!'}, 
    {word: 'sauce', response: 'Every year thousands of delicious portions of sauces go unwanted and uneaten due to a lack of accompaniment. Please remember to prepare delicious meats, vegetable blends, and starches along with your sauces. Pasta. Rice. Even a warm crusty loaf of bread will do the job in a pinch. Don\'t let that sauce go to waste. Meal your sauce.'},
    {word: 'beef', response: 'Is that BOEUF BOURGUIGNON?! Or is it a LONDON BROIL?'},
    {word: 'soup', response: 'Good soup!'},
    {word: 'shrimp', response: 'I\'d scale a wall to make an incredible grab for Jumbo Shrimp!'},
    {word: 'bread', response: 'Um hello I would like to go to the bread store please. I do not know what you mean boneless... I would like bread and loafs, yes, thank you!'},
    {word: 'sandwich', response: 'Please do not mention what makes a sandwich, a sandwich... We had to table that discussion to a special committee to address in 2025... It is a sensitive topic... Thank you for your understanding...'},
    {word: 'pudding', response: 'We must advance our knowledge of pudding techniques... Puddingway has the right idea...!'},
    {word: 'snack', response: 'Can I have some of your shnackum please? Thank you so much in advance thank you.'},
    {word: 'hotdish', response: 'Oh, fer cute... What a great food, don\'tcha know!'},
    {word: 'burger', response: 'You overestimate your borgar, my friend! ... Actually no I bet it is very good.'},
    {word: 'cookie', response: 'OH cookies are very good there are so many kinds! There is choco chip, and oatmeal, and snickered doodles, and double choco chip, and also there is sugar cookies, and peanut butter cookies, and also there are the black and white cookies... I think there are so many cookies in the world and that is a really beautiful thing. I heard from a blue lady that we don\'t even know how many cookies there are in the world because there are so many and I think I would like to try and learn every cookie.'},
    {word: 'pistachio', response: 'Pistachios are green and also they are good salty but also sweet if you make them in a cake, but mostly they are green, and that is what makes them Gulpin Approved!'}
];

client.on('ready', () => {
    client.user.setActivity("Sushi-Go-Round");
});

client.on('message', async message => {
    if (foodwords.some(word => message.toString().includes(word))) {
        if (!servers[message.server.id]) {
            servers[message.server.id] = Date.now() - 1810000;
        }
        var usable_responses = responses;
        for (const thisBonus of bonuses) {
            if (message.toString().includes(thisBonus.word)) {
                usable_responses.push(thisBonus.response);
            }
        };
        if(servers[message.server.id] < Date.now() - 1800000) {
            message.channel.send(usable_responses[Math.floor(Math.random()*usable_responses.length)]);
        }
    }
});