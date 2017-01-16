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

    <link rel="stylesheet" href="assets/styles/templates/index.min.css">
</head>

<?php
    $txtJsError = "We apologize, but some parts of the site might not work properly without JavaScript."
?>

<body>

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


    <?php //SCRIPTS ?>
    <script defer src="assets/scripts/templates/index.min.js"></script>
</body>

</html>
