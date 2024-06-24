<!DOCTYPE html>
<html lang="de">
<head>
    <style>
        body {
            background: #e1e5e8;
            font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
        }
        .content {
            padding: 2rem;
            background: #fff;
            border-radius: 1rem;
        }
        .flex {
            display: flex;
        }
        .flex-column {
            flex-direction: column;
        }
        .align-items-center {
            align-items: center;
        }
        .justify-content-center {
            justify-content: center;
        }
        button {
            background-color: #8BB31D !important;
            padding: 10px 25px !important;
            font-size: 15px;
            border: none !important;
            border-radius: 2px;
            color: #ffffff;
            text-align: center;
            white-space: nowrap;
            cursor: pointer;
        }
        .input {
            margin-bottom: 0.5rem;
        }
        label {
            margin-bottom: 3px;
        }
        h1 {
            margin: 0;
        }
        .logo {
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        .checkmark {
            font-size: 50px;
            color: green;
            margin-bottom: 0.5rem;
        }
        h3 {
            margin-top: 0;
        }
    </style>
    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body class="flex flex-column align-items-center justify-content-center">

<div class="logo">
    <img alt="ZeroFlex" src="{{ asset('images/logo1.png') }}" width="200px" height="auto">
</div>

<div class="content flex flex-column align-items-center justify-content-center">

    <i class="fas fa-circle-info checkmark"></i>

    <h2 style="margin-bottom: 1.5rem">Ein neues Projekt wurde angelegt.</h2>

    <div>Fakultät</div>
    <h3>{{$project->faculty->name}}</h3>

    <div>Projekttyp</div>
    <h3>{{$project->projectType->name}}</h3>

    <div>Bezeichnung</div>
    <h3>{{$project->name}}</h3>

</div>

</body>
</html>
