# PowerShell script to seed events with new images and ASCII hyphens in names
$events = @(
  @{ name="FIFA WC 2026 - Opener: Mexico vs Poland"; description="Opening match of the FIFA World Cup 2026 in Mexico City."; image="https://upload.wikimedia.org/wikipedia/commons/0/02/Estadio_Azteca_from_above.jpg"; price=120; category="Football"; venue="Estadio Azteca, Mexico City"; date="2026-06-11T18:00:00Z" },
  @{ name="FIFA WC 2026 - Canada vs Spain"; description="Exciting group stage match between Canada and Spain."; image="https://upload.wikimedia.org/wikipedia/commons/9/9b/BMO_Field_East_Stands.jpg"; price=110; category="Football"; venue="BMO Field, Toronto"; date="2026-06-12T19:00:00Z" },
  @{ name="FIFA WC 2026 - USA vs France"; description="USA faces France in a thrilling World Cup encounter."; image="https://upload.wikimedia.org/wikipedia/commons/e/e6/SoFi_Stadium_2021.jpg"; price=115; category="Football"; venue="SoFi Stadium, Los Angeles"; date="2026-06-12T19:00:00Z" },
  @{ name="FIFA WC 2026 - Germany vs Japan"; description="Germany takes on Japan in Vancouver for the World Cup."; image="https://upload.wikimedia.org/wikipedia/commons/1/1b/BC_Place_%28interior%29_2015.jpg"; price=105; category="Football"; venue="BC Place, Vancouver"; date="2026-06-13T19:00:00Z" },
  @{ name="FIFA WC 2026 - Canada vs Morocco"; description="Canada plays Morocco in a crucial group stage match."; image="https://upload.wikimedia.org/wikipedia/commons/1/1b/BC_Place_%28interior%29_2015.jpg"; price=110; category="Football"; venue="BC Place, Vancouver"; date="2026-06-18T19:00:00Z" },
  @{ name="FIFA WC 2026 - Belgium vs Argentina"; description="Belgium and Argentina battle for a spot in the next round."; image="https://upload.wikimedia.org/wikipedia/commons/f/fd/ARGENTINA_v_BELGIUM_%2814539154661%29.jpg"; price=100; category="Football"; venue="BC Place, Vancouver"; date="2026-06-21T19:00:00Z" },
  @{ name="FIFA WC 2026 - Brazil vs Switzerland"; description="Brazil faces Switzerland in a high-stakes World Cup match."; image="https://upload.wikimedia.org/wikipedia/commons/5/5e/Brazil_vs_Switzerland_-_Match_8_-_Group_E_-_2018_FIFA_World_Cup_-_DSC_4784.jpg"; price=130; category="Football"; venue="BC Place, Vancouver"; date="2026-07-02T19:00:00Z" },
  @{ name="FIFA WC 2026 - England vs Netherlands"; description="England meets Netherlands in a classic football showdown."; image="https://upload.wikimedia.org/wikipedia/commons/6/6f/Nations_League_2019_-_Netherlands_vs_England_26.jpg"; price=135; category="Football"; venue="BC Place, Vancouver"; date="2026-07-07T19:00:00Z" },
  @{ name="FIFA WC 2026 - Italy vs Brazil"; description="Italy and Brazil face off in a legendary World Cup match."; image="https://upload.wikimedia.org/wikipedia/commons/4/49/Italy_vs_Brazil_1982_World_Cup.jpg"; price=140; category="Football"; venue="AT&T Stadium, Dallas"; date="2026-07-14T19:00:00Z" },
  @{ name="FIFA WC 2026 - Final: Argentina vs France"; description="The grand final: Argentina vs France for the World Cup title."; image="https://upload.wikimedia.org/wikipedia/commons/2/27/Argentina_vs_France_2022.jpg"; price=200; category="Football"; venue="MetLife Stadium, New Jersey"; date="2026-07-19T19:00:00Z" },
  @{ name="T20 WC 2026 - India vs Ireland"; description="T20 World Cup match: India takes on Ireland in Ahmedabad."; image="https://upload.wikimedia.org/wikipedia/commons/e/e5/Narendra_Modi_Stadium_Ahmedabad.jpg"; price=45; category="Cricket"; venue="Narendra Modi Stadium, Ahmedabad"; date="2026-02-10T09:30:00Z" },
  @{ name="T20 WC 2026 - Pakistan vs New Zealand"; description="Pakistan faces New Zealand in Hyderabad for the T20 World Cup."; image="https://upload.wikimedia.org/wikipedia/commons/3/3b/Rajiv_Gandhi_International_Cricket_Stadium%2C_Hyderabad.jpg"; price=42; category="Cricket"; venue="Hyderabad"; date="2026-02-10T14:00:00Z" },
  @{ name="T20 WC 2026 - England vs Afghanistan"; description="England and Afghanistan clash in Kolkata for the T20 World Cup."; image="https://upload.wikimedia.org/wikipedia/commons/b/bb/Eden_Gardens%2C_Kolkata.jpg"; price=40; category="Cricket"; venue="Eden Gardens, Kolkata"; date="2026-02-11T09:30:00Z" },
  @{ name="T20 WC 2026 - Australia vs USA"; description="Australia plays USA in Chennai for a T20 World Cup match."; image="https://upload.wikimedia.org/wikipedia/commons/e/ef/Chennai_Chepauk_Stadium.jpg"; price=42; category="Cricket"; venue="Chennai"; date="2026-02-11T14:00:00Z" },
  @{ name="T20 WC 2026 - Sri Lanka vs Ireland"; description="Sri Lanka faces Ireland in Delhi for the T20 World Cup."; image="https://upload.wikimedia.org/wikipedia/commons/3/36/Feroz_Shah_Kotla_Ground_Delhi.jpg"; price=40; category="Cricket"; venue="Arun Jaitley Stadium, Delhi"; date="2026-02-15T09:30:00Z" }
)

foreach ($event in $events) {
  $json = $event | ConvertTo-Json -Depth 3
  try {
    Invoke-RestMethod -Uri "http://localhost:5000/api/events/" -Method Post -Body $json -ContentType "application/json"
    Write-Host "✅ Seeded: $($event.name)"
  } catch {
    Write-Host "❌ Failed to seed: $($event.name)"
    Write-Host $_.Exception.Message
  }
}
