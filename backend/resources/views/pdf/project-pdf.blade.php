<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Projekt - {{$project->name}}</title>
    <style>
        body {
            font-size: 12px;
        }

        .placename {
            font-family: DejaVu Sans;
            font-size: 10px;
        }

        small {
            font-size: 8px;
            color: #909090;
        }

        .mb-1 {
            margin-bottom: 4px;
        }

        .mb-2 {
            margin-bottom: 8px;
        }

        .mb-3 {
            margin-bottom: 12px;
        }

        .mb-4 {
            margin-bottom: 16px;
        }

        .mb-5 {
            margin-bottom: 20px;
        }

        .mb-large {
            margin-bottom: 4rem;
        }

        .pt-4 {
            padding-top: 16px;
        }

        .w-10 {
            width: 10%;
        }

        .w-15 {
            width: 15%;
        }

        .w-33 {
            width: 33%;
        }

        .w-50 {
            width: 50%;
        }

        .w-66 {
            width: 66%;
        }

        .w-75 {
            width: 75%;
        }

        .w-100 {
            width: 100%;
        }

        table {
            border-collapse: collapse;
        }

        .border-top {
            border-top: 1px solid black;
            padding-top: 4px;
            margin-top: 4px;
        }

        .border-bottom {
            border-bottom: 1px solid black;
            padding-bottom: 4px;
            margin-bottom: 4px;
        }

        .logo {
            height: 150px;
            width: 150px;
        }

        th {
            text-align: left;
        }

        td {
            text-align: left;
        }

        .text-end {
            text-align: right;
        }

        .text-muted {
            color: #909090;
        }

        .text-small {
            font-size: 10px;
        }

        .text-smaller {
            font-size: 8px;
        }
    </style>
</head>

<body style="margin-left: 48px">

<table class="w-100">
    <tr>
        <td class="w-66">
            <strong>{{$project->name}}</strong>
        </td>
    </tr>
</table>

<table class="w-100">
    <tr style="border-bottom: 1px solid">
        <th class="border-bottom">Vortragende/r</th>
        <th class="border-bottom">Fakultät</th>
        <th class="border-bottom">Stundenrate</th>
        <th class="border-bottom">Tagesrate</th>
        <th class="border-bottom">Stunden</th>
        <th class="border-bottom">Kosten</th>
    </tr>

    @foreach($project->lecturers as $projectLecturer)
        <tr class="text-small">
            <td style="padding: 4px 0">{{$projectLecturer->lecturer->name}}</td>
            <td style="padding: 4px 0">{{$projectLecturer->lecturer->faculty->name}}</td>
            <td style="padding: 4px 0">{{$projectLecturer->lecturer->hourly_rate}}</td>
            <td style="padding: 4px 0">{{$projectLecturer->lecturer->daily_rate}}</td>
            <td style="padding: 4px 0">{{$projectLecturer->hours}}</td>
{{--            <td style="padding: 4px 0">{{ number_format($projectLecturer->hours * $projectLecturer->lecturer->hourly_rate, 2, ',', '.') }}</td>--}}
        </tr>
    @endforeach


</table>

<div class="border-bottom"></div>

<table class="w-100 pt-4 mb-5">
    <tr>
        <th>Gesatkosten</th>
        <th class="text-end">{{$costs}} €</th>
    </tr>
</table>


<div>
    <p>{{$project->notes}}</p>
</div>


</body>

</html>
