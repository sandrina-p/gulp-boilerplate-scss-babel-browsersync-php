<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>boilerplate#01 by sandrina-p</title>

    <meta name='copyright' content='[copyright]'>
    <meta name='description' content='[keep it short, simple]'>
    <meta name="Designer" content="[the designer]">
    <meta name='language' content='en-US'>
    <meta name='subject' content='[awesomeness]'>

    <meta name="DC.title" content="[title]" />
    <meta name="DC.creator " content="[god]" />
    <meta name="DC.creator.address" content="[god@evil.com]" />

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>

    <link rel="icon" type="image/png" href="assets/media/favicon16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="assets/media/favicon32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="assets/media/favicon64.png" sizes="64x64">
    <link rel="icon" type="image/png" href="assets/media/favicon180.png" sizes="180x180">

    <?php // twitter card ?>

    <meta name="twitter:card" content="[title]" />
    <meta name="twitter:site" content="[site url]" />
    <meta name="twitter:title" content="[site title]" />
    <meta name="twitter:description" content="[description]" />
    <meta name="twitter:image" content="assets/media/card.png" />

    <?php // Open Graph protocol (facebook card) ?>
    <meta property="og:title" content="[title]" />
    <meta property="og:type" content="[type]" />
    <meta property="og:url" content="[site url]" />
    <meta property="og:image" content="assets/media/card.png" />


    <?php
        $cssInline = true // extract css and put it inline on DOM. https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
        $txtJsError = "We apologize, but some parts of the site might not work properly without JavaScript."
    ?>

    <?php if ($cssInline) {  ?>
        <style>
            <?php echo file_get_contents('assets/styles/04_templates/header.min.css') ?>
        </style>
    <?php } else { ?>
        <link rel="stylesheet" href="assets/styles/templates/header.min.css">
    <?php } ?>
</head>


<body>

    <!-- Google Analytics -->
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'xx-yyyyyyy-z', 'auto');
        ga('send', 'pageview');
    </script>

    <?php //SCHEMA TAG - @TYPE ?>
    <script type="application/ld+json">
        [
            {
                "@context" : "http://schema.org",
                "@type" : "WebSite",
                "name" : "[website name]",
                "url" : "https://www.xxx.com",
                "description": "[keep it short, simple]",
                "image" : "https://www.xxx.com/path/to/image.png",
                "sameAs" : [
                    "https://www.facebook.com/xxx",
                    "https://twitter.com/xxx",
                    "https://www.youtube.com/user/xxx",
                    "https://www.linkedin.com/company/xxx"
                ]
            }
        ]
    </script>

    <noscript>
        <div class="u-alert--error"> <?php echo $txtJsError ?> </div>
    </noscript>

    <div>
        <em>under construction</em>
        <h1>Thanks for using me!</h1>
        <p>Not sure what to do next? <a href="#">Check it here.</a> </p>
        <p>Please feel free to use this boilerplate and modify it.<p>

        <p>Any bug / suggestion / feedback you might have, please let me know. I really appreciate it!</p>
        <p>If you don't have anything to say at all, well... too bad ¯\_(ツ)_/¯</p>

        <em>Have fun!</em>
        <br>
        TODO: add fontawesome, css inline, css script, style this page
    </div>


    <?php // If you need to include a php file partial ?>
    <?php //include 'relative/path/to/partial.php'; ?>


    <?php //Styles Google way - https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery ?>
    <noscript>
        <link rel="stylesheet" href="assets/styles/04_templates/index.min.css">
    </noscript>
    <!--[if lt IE 9 || IE9]>
        <link rel="stylesheet" href="assets/styles/04_templates/index.min.css">
    <![endif]-->
    <script>
        var cb = function() {
            var l = document.createElement('link'); l.rel = 'stylesheet';
            l.href = 'assets/styles/04_templates/index.min.css';
            document.getElementsByTagName('head')[0].appendChild(l);
        };
        var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
        if (raf) raf(cb);
        else window.addEventListener('load', cb);
    </script>


    <?php // fontawesome.io 4.7 ?>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">


    <?php //SCRIPTS ?>
    <script defer src="assets/scripts/templates/index.min.js"></script>
</body>

</html>
