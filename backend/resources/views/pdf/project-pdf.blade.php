<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>{{ $project->name }}</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 12px;
            margin: 20px;
        }
        .header, .footer {
            text-align: center;
            position: fixed;
            width: 100%;
        }
        .header {
            top: 0px;
        }
        .footer {
            bottom: 0px;
            font-size: 10px;
            color: #909090;
        }
        .container {
            margin-top: 50px;
        }
        .section {
            margin-bottom: 30px;
        }
        .title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .sub-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .content {
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        .text-right {
            text-align: right;
        }
    </style>
</head>
<body>

<div class="footer">
    <p>PDF erstellt am {{ now()->format('d.m.Y') }}</p>
</div>

<div class="container">
    <h1 style="text-align: center; width: 100%">{{ $project->name }}</h1>
    <!-- Project Details -->
    <div class="section">
        <div class="content">
            <p><strong>Kunde:</strong> {{ $project->company->name }}</p>
            <p><strong>Typ:</strong> {{ $project->projectType->name }}</p>
            <p><strong>Ansprechperson:</strong> {{ $project->firstname }} {{ $project->lastname }} ({{ $project->email }})</p>
            <p><strong>Fakultät:</strong> {{ $project->faculty->name }}</p>
            <p><strong>Startdatum:</strong> {{ $project->start->format('d.m.Y') }}</p>
            <p><strong>Enddatum:</strong> {{ $project->end->format('d.m.Y') }}</p>
            @if($project->projectType->is_course)
                <p><strong>Teilnehmeranzahl:</strong> {{ $project->participants }}</p>
                <p><strong>Dauer:</strong> {{ $project->duration }} Tage</p>
                <p><strong>ECTS:</strong> {{ $project->ects }}</p>
                @if($isAdmin)
                    <p><strong>Preis für Teilnehmer pro Tag:</strong> {{ $pricePerDay }} €</p>
                @endif
            @endif
            <p><strong>Anmerkungen:</strong> {{ $project->notes }}</p>
            <p><strong>Gesamtkosten:</strong> {{ $costs }} €</p>
        </div>
    </div>

    <!-- Lecturers -->
    <div class="section">
        <div class="sub-title">Vortragende</div>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Fakultät</th>
                @if($isAdmin)
                    <th>Stundensatz</th>
                    <th>Tagessatz</th>
                @endif
                <th>Stunden</th>
                <th>Tage</th>
                <th>Kosten</th>
            </tr>
            </thead>
            <tbody>
            @foreach($project->lecturers as $projectLecturer)
                <tr>
                    <td>{{ $projectLecturer->lecturer->name }}</td>
                    <td>{{ $projectLecturer->lecturer->faculty->name }}</td>
                    @if($isAdmin)
                        <td>{{ number_format(($projectLecturer->hourly_rate_override ?? $projectLecturer->lecturer->hourly_rate) / 100, 2, ',', '.') }} €</td>
                        <td>{{ number_format(($projectLecturer->daily_rate_override ?? $projectLecturer->lecturer->daily_rate) / 100, 2, ',', '.') }} €</td>
                    @endif
                    <td>{{ $projectLecturer->daily ? '-' : $projectLecturer->hours }}</td>
                    <td>{{ $projectLecturer->daily ? $projectLecturer->hours : '-' }}</td>
                    <td>{{ number_format($projectLecturer->hours * ($projectLecturer->daily ? ($projectLecturer->daily_rate_override ?? $projectLecturer->lecturer->daily_rate) : ($projectLecturer->hourly_rate_override ?? $projectLecturer->lecturer->hourly_rate)) / 100, 2, ',', '.') }} €</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    <!-- Expenses -->
    <div class="section">
        <div class="sub-title">Aufwände</div>
        <table>
            <thead>
            <tr>
                <th>Aufwand</th>
                <th>Kosten</th>
            </tr>
            </thead>
            <tbody>
            @foreach($project->expenses as $expense)
                <tr>
                    <td>{{ $expense->expense->name }}</td>
                    <td>{{ number_format($expense->costs / 100, 2, ',', '.') }} €</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    @if($isAdmin)
        <!-- Other Expenses -->
        <div class="section">
            <div class="sub-title">Zusätzliche Aufwände</div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Pro Teilnehmer</th>
                    <th>Kosten</th>
                </tr>
                </thead>
                <tbody>
                @foreach($project->otherExpenses as $otherExpense)
                    <tr>
                        <td>{{ $otherExpense->name }}</td>
                        <td>{{ $otherExpense->per_participant ? 'Ja' : 'Nein' }}</td>
                        <td>{{ number_format($otherExpense->costs * ($otherExpense->per_participant ? $project->participants : 1) / 100, 2, ',', '.') }} €</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

        <!-- Group-Specific Expenses -->
        <div class="section">
            <div class="sub-title">Projektgruppenspezifische Aufwände</div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Pro Teilnehmer</th>
                    <th>Kosten</th>
                </tr>
                </thead>
                <tbody>
                @foreach($project->groupSpecificExpenses as $groupSpecificExpense)
                    <tr>
                        <td>{{ $groupSpecificExpense->name }}</td>
                        <td>{{ $groupSpecificExpense->per_participant ? 'Ja' : 'Nein' }}</td>
                        <td>{{ number_format($groupSpecificExpense->costs * ($groupSpecificExpense->per_participant ? $project->participants : 1) / 100, 2, ',', '.') }} €</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    @endif
</div>

</body>
</html>
