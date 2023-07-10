# Session 06 | Lab



### Learning Objectives

- Get familiar with HTML, CSS, and basic JavaScript. 

### Prerequisites

- You have downloaded and installed JetBrains WebStorm.
- You are excited about creating your first website and ultimately an advanced COVID dashboard. 

### Summary

In this lab, you will create your first website with an elaborate grid of div container that you
 will populate over the course of the next four sessions. Furthermore, you will use some basic
  DOM manipulation to develop a fundamental understanding of how to create an interactive website/dashboard.
  
### Useful links

- https://getbootstrap.com/docs/5.3/getting-started/introduction/  (bootstrap documentation)
- https://www.w3schools.com/ (great html, css and JS tutorials for beginners and intermediate web
 developers)
- https://css-tricks.com/ (great website to learn about the power of CSS - which everybody tends
 to underestimate)


----



## Lab 06 - Activity

![Preview](example_playgrounds/img/final_result.png?raw=true "Final Result")


Below,we find all tasks you will need to complete in order to create a dashboard grid similar to
the preview image. The tasks are supposd to structure your coding process but feel free to
create your own workflow as soon as you feel comfortable

1. **Create a best practice folder structure for your project**

   * Create a new html document called `index.html`
    * Inside `session_06` folder, create a folder called 'css', and a folder called 'js'. Your folder now should look like this:

   ![img.png](img/img.png)

&nbsp;

2. **Add bootstrap.css, bootstrap.js and all necessary dependencies**
    There are two ways to do so:

   * Go to https://getbootstrap.com/docs/5.1/getting-started/download/. 
   Download the Compiled CSS and JS files. We will be only using the `bootstrap.css` file. Drag this file inside your `css` folder in your folder structure. Now your folder should it should look like this:

![img_1.png](img/img_1.png)
   * Instead of downloading the files manually, directly copy the following in side `<head>  </head>` tag in your `index.html` file:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
```
&nbsp;

3. **Create the grid** 
   
(For this task, you may follow the `Grid` section in the `Documentation` below)
   * Add a fluid bootstrap div-container that covers the entire page
   * Within that container, create a grid with three rows
   * For the second row, create a two column outline
   * In the right column, create another 3-row layout

     * Play around with the height property of each row. You might find it particularly useful to use `%` rather than `vh` or
     `px`
     as measure. The rows' heights should sum up to 100% so that you use the entire height f the
     column.
     * You can check out the `Absolute & Relative` section in the `Documentation` below.
   * In the top row, create a two column layout.

&nbsp;

4. **Add content inside the grid**
   * Put a (centered) heading in the first row
   * In the second and third row add a (centered) heading
   * In the top row with the two columns, add a button in the left column and a drop down menu on
    the right*

&nbsp;

5. **Add margin, padding, border to the boxes**
   * (For this task, you may follow the `The CSS Box Model` section in the `Documentation` below)

---

# DOCUMENTATION


## Creating a Website: Boilerplate HTML 

As some of you might already know, HTML is not a real coding language. It is a markup language
 that our browsers such as Chrome, Mozilla or Safari are reading, interpreting, and rendering. The 
  HTML elements - marked with ```<..>``` - are the fundamental building blocks of a website. 
  When a web page is loaded, the browser creates a Document Object Model of the page.
  
  The HTML DOM model is constructed as a tree of Objects:
  
  
![Preview](example_playgrounds/img/DOM.GIF?raw=true "D3 Projections")

As you can see on this basic diagram (which is a basic website with just one link), there are
 some basic tags that will always be part of your html file (document, html, head, body). For that
  reason, it is
  common
  practice to have some boilerplate code prepared that you can copy-paste whenever you create a new
   html file. WebStorm pre-populates each html file with some basic tags, but feel free to
    include more than just that. This could be a grid of a standard website design that you like
     as well as some CSS and JavaScript libraries that are commonly used. 
  
  ```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

</body>
</html>

```

Now, create a new HTML file and just write the magic words "hello, world" in between the body
 tags. If you've never written any HTML before you should feel a bit proud because you've just
  created your first own website.

## Basic HTML elements

Of course, you want to do a little better than just writing some words into the body of a
 website. We're sure that you already know quite a few elements that you could put into the body
  but you might not know the exact syntax, yet. So let's get you up to speed:
  
### 1. hyperlink
  
  To include a link, the only think you have to do is to put some ```<a>``` tags around the text
   that should appear and function as a link.         
  
```html
<a href="www.google.de">hello, world</a>
```
    
    Notice that you can style html elements using css. There are various ways how to apply styling but
 the most intuitive way might be to do it in the html file itself right inside the html element's
  tag. You can simply include the ```style``` attribute and write css code. Here's an example
   with some (horrific) styling:

```html
 <a href="www.google.de" style="font-size: 10px; background-color: red">hello, world</a>
```

### 2.image

  To include an image, you will need to use simple ```<img>``` tag and include the path to the
   source where the image is stored - this could be locally on your machine or on a server in the
    world wide web (in that case, just include an url).

  
  
### 3. other elements

you get the idea - you just need to know what tag to use and what nuances you need to look out
 for when using this tag. Try to add a button to your website - use google, stack overflow, the w3
  schools' website or  the bootstrap documentation if you don't know where to start.
 

## Grid
### Structuring the DOM with Bootstrap Grid
   
   As of now, you probably have a very unstructured website with a bunch of HTML elements sitting
    in the body and you might be wondering how to place them more systematically on the website
    . In oder to do that, you will need to divide your body into segments using ```<div
    >``` containers. With the help of the Bootstrap Grid System (a css and JavaScript library) that
     relies on
     columns and
     rows you will be able to design powerful and effective grids that will serve as the starting
      point for any dashboard. In order to get started with Bootstrap you will need to include the
       respective Bootstrap files (css, js, and dependencies) into the DOM as described in the
        bootstrap documentation.
      
   After including the files, let's start with a basic example:
   
   First, we'll have a fluid
    container that is basically as big as our entire body. It has a height of 100 vh
     (viewpoint height), which is equivalent with the  height of the browser. Since we give it
      the bootstrap class ```container-fluid``` it will automatically expand to the full width.
   
      
 ```html

<div class="container" style="background: lightskyblue; height: 100vh">
</div>      
```
   
  Inside this big parent div container, you can use further div containers with different bootstrap
   classes to create a grid of columns and rows. The class names are quite intuitive: ```col``` and
    ```row```. Notice, that rows live in the parent container and columns live inside rows. While
     a row has no pre-defined height and you have to provide a specific height using CSS, a
      column doesn't have a width initially. Thus, you will have to define the width of a column
      . In Bootstrap however, you're not defining the width in pixels or an equivalent measure
      . Instead, underneath the hood, the Bootstrap grid divides each row into 12 segments and a
       column can occupy any number of there 'width-segments'. To define a width, you simply add
        ```-(any number betwenn 1-12)``` to the ```col``` class, i.e. ```<div class='col-3
        '>```. Ultimately, your columns should add up to 12. Let's check out an example with some
         additional CSS for better readability:
   
 ```html

<div class="container" style="height: 100vh">
    <div class="row" style="height: 20vh; background: #3ba08c"></div>
    <div class="row" style="height: 70vh;">
        <div class="col-6" style="background: lightseagreen"></div>
        <div class="col-6" style="background: #63c3bd"></div>
    </div>
    <div class="row" style="height: 10vh; background: rgba(32,178,170,0.85)"></div>
</div>    
```

Congratulations, you've just finished writing your first Bootstrap grid. Try to make your grid a
 bit more complex and add some of the elements you've learned about in the section above.
 
 While experimenting with the grid and various elements you might start to wonder how to position
  elements in the center of a parent element. Check out the example below and learn about best 
 practices from Boostrap 4 and 5.

```html


<div class="container" style="height: 100vh">
    <div class="row" style="height: 20vh; background: #3ba08c"></div>
    <div class="row" style="height: 70vh;">
        <div class="col-6" style="background: lightseagreen">
            <div class="row justify-content-center" style="height: 100%">
                <div class="align-self-center" style="text-align: center; padding: 10px">
                    this text is in the center because it's using the CSS style 'text-align: center'
                    and the html element in which the text resides in uses the class 'align-self-center'
                    and it's parent is a row of height 100% with the class 'justify-content-center'. In Bootstrap
                    version 4, this was the best practice.
                </div>
            </div>
        </div>
        <div class="col-6" style="background: #63c3bd">
            <div class="row align-items-center" style="height: 100%; background: #b3e2cd; border: thin solid black; border-radius: 5px;">
                <p class="text-center">
                    this text is in the center because the html element in which the text resides in uses the class 'text-center'
                    and it's parent is a row of height 100% with the class 'align-items-center'. In Bootstrap version 5, this is
                    the best practice. Read more about aligning items in v5  <a href="https://getbootstrap.com/docs/5.3/utilities/flex/#with-align-items">here</a>.
                </p>
            </div>
        </div>
    </div>
    <div class="row" style="height: 10vh; background: rgba(32,178,170,0.85)"></div>
</div>

```

---
## The CSS Box Model: Borders, Margin, Padding

In CSS, the term "box model" is used when talking about design and layout.

The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content. The image below illustrates the box model:

![Preview](example_playgrounds/img/box_model.png?raw=true "Final Result")

- Content - The content of the box, where text and images appear
- Padding - Clears an area around the content. The padding is transparent
- Border - A border that goes around the padding and content
- Margin - Clears an area outside the border. The margin is transparent



To apply those CSS, we apply them in the attribute `style`  in the HTML tag, for example `<div>` . To note, we cannot create a row inside a row, therefore we have to create a `<col>` inside the first `<row>`, which holds the second `<row>` inside. We provide an usage example as followed:
```html
    <div class="row" style="height: 50vh; background: #c59eec; padding: 1vh">
        <div class="col">
            <div class="row" style="height: 48vh; background: rgba(225,217,217,0.96); border: thin solid black; border-radius: 5px;">
                text
            </div>
    </div>
```
     

----

## Center
You will come to a point when you want to center your child object inside the parent object, for example, the `text` inside the `col`. There are a few ways to do so. Here we are giving one example of how you can achieve it. 
In this one way we are showing, you should apply a `class= row align-items-center` to the parent tag, in this case`<div>`. Then you should also apply `class="text-center"` to the child tag, in this case `<text>`.
```html
<div class="row align-items-center">
	<h1 class="text-center"> Your Title Here </h1>
</div>
```
You are highly encouraged to ask ChatGPT what are the ways that you may center item in HTML. As a bonus task, you should try out other ways to center the `text`


---

### Absolute & Relative: PX, EM, REM, %, VW, and VH

In CSS, you can specify sizes or lengths of elements using various units of measure. The units of measure that you’ll find in some Elementor options include PX, EM, REM, %, VW, and VH, although there are several more available in CSS. Not every Elementor element will offer all of these units. Elementor only presents the options that make the most sense for the given element.

**Absolute Units**
- PX: Pixels (px) are considered absolute units, although they are relative to the DPI and resolution of the viewing device. But on the device itself, the PX unit is fixed and does not change based on any other element. Using PX can be problematic for responsive sites, but they are useful for maintaining consistent sizing for some elements. If you have elements that should not be resized, then using PX is a good choice.

**Relative Units**
- EM: Relative to the parent element

- REM: Relative to the root element (HTML tag)

- %: Relative to the parent element

- VW: Relative to the viewport’s width

- VH: Relative to the viewport’s height

Unlike PX, relative units like %, EM, and REM are better suited to responsive design and also help meet accessibility standards. Relative units scale better on different devices because they can scale up and down according to another element’s size.


**Congratulations for finishing lab #6! See you tomorrow!**
