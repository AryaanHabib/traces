

import matplotlib.pyplot as plt
import json
import os

star_coordinates = [
  {
    "lat": 49.26626136183224,
    "lng": -123.2505844204623
  },
  {
    "lat": 49.26624081654601,
    "lng": -123.25055535871176
  },
  {
    "lat": 49.26623301419483,
    "lng": -123.25050997199702
  },
  {
    "lat": 49.2662276073303,
    "lng": -123.25050323085553
  },
  {
    "lat": 49.26621504258649,
    "lng": -123.25053061517593
  },
  {
    "lat": 49.26620737330324,
    "lng": -123.2505718483788
  },
  {
    "lat": 49.26620322452295,
    "lng": -123.2506140675841
  },
  {
    "lat": 49.266202077942665,
    "lng": -123.25065439460786
  },
  {
    "lat": 49.266202565317194,
    "lng": -123.25068993251335
  },
  {
    "lat": 49.266203740603544,
    "lng": -123.25072709673115
  },
  {
    "lat": 49.266204513150406,
    "lng": -123.25076414558754
  },
  {
    "lat": 49.26619822313595,
    "lng": -123.25081383604932
  },
  {
    "lat": 49.266194275841805,
    "lng": -123.25086270410571
  },
  {
    "lat": 49.26619403437087,
    "lng": -123.25089068797963
  },
  {
    "lat": 49.266207676982084,
    "lng": -123.25089288627903
  },
  {
    "lat": 49.26622850579395,
    "lng": -123.25088070907567
  },
  {
    "lat": 49.26625122251996,
    "lng": -123.2508741349747
  },
  {
    "lat": 49.26627433245421,
    "lng": -123.25086313348669
  },
  {
    "lat": 49.266295492659815,
    "lng": -123.25085061072362
  },
  {
    "lat": 49.26631725799729,
    "lng": -123.25083435794527
  },
  {
    "lat": 49.266339726911326,
    "lng": -123.25082163050139
  },
  {
    "lat": 49.26636741795175,
    "lng": -123.25079491657192
  },
  {
    "lat": 49.26639494415715,
    "lng": -123.25076556826684
  },
  {
    "lat": 49.266419503883704,
    "lng": -123.25073107157205
  },
  {
    "lat": 49.26642483807402,
    "lng": -123.25070997711573
  },
  {
    "lat": 49.26641595757125,
    "lng": -123.2506986056671
  },
  {
    "lat": 49.2663949168771,
    "lng": -123.25069202226062
  },
  {
    "lat": 49.266371626833326,
    "lng": -123.25068765059582
  },
  {
    "lat": 49.26634700317612,
    "lng": -123.25068416507541
  },
  {
    "lat": 49.266322144056915,
    "lng": -123.25068385042073
  },
  {
    "lat": 49.26628856517568,
    "lng": -123.25069839212802
  },
  {
    "lat": 49.26625664858142,
    "lng": -123.25070897432646
  },
  {
    "lat": 49.2662256863427,
    "lng": -123.25071746494923
  },
  {
    "lat": 49.266205513895734,
    "lng": -123.2507130784199
  },
  {
    "lat": 49.26618429371087,
    "lng": -123.25071092706476
  },
  {
    "lat": 49.26616055895506,
    "lng": -123.25070871983026
  },
  {
    "lat": 49.266136480034646,
    "lng": -123.2507065459934
  },
  {
    "lat": 49.26612832927299,
    "lng": -123.25071461612394
  },
  {
    "lat": 49.26613522456202,
    "lng": -123.25072872165576
  },
  {
    "lat": 49.26615634359421,
    "lng": -123.25074814773647
  },
  {
    "lat": 49.26618442598575,
    "lng": -123.25076451007266
  },
  {
    "lat": 49.26620952772182,
    "lng": -123.25078487567562
  },
  {
    "lat": 49.26623371641807,
    "lng": -123.25080638769894
  },
  {
    "lat": 49.26625080184632,
    "lng": -123.25083007381988
  },
  {
    "lat": 49.26627054863133,
    "lng": -123.2508505510644
  },
  {
    "lat": 49.26629177146511,
    "lng": -123.25086981630675
  },
  {
    "lat": 49.266314199745715,
    "lng": -123.25088461290659
  },
  {
    "lat": 49.26633650340167,
    "lng": -123.25089875271998
  },
  {
    "lat": 49.266356680572265,
    "lng": -123.25090948598245
  },
  {
    "lat": 49.266376373400355,
    "lng": -123.25092499301702
  },
  {
    "lat": 49.266383699660366,
    "lng": -123.25092487362053
  },
  {
    "lat": 49.2663815518863,
    "lng": -123.25091085814718
  },
  {
    "lat": 49.26636938079804,
    "lng": -123.25087878880517
  },
  {
    "lat": 49.26635888448484,
    "lng": -123.25084455017766
  },
  {
    "lat": 49.266348076462656,
    "lng": -123.2508130342701
  },
  {
    "lat": 49.266336467851396,
    "lng": -123.25078004241186
  },
  {
    "lat": 49.266325436714034,
    "lng": -123.25075208202105
  },
  {
    "lat": 49.26630885487463,
    "lng": -123.25071878200531
  },
  {
    "lat": 49.26629062147242,
    "lng": -123.25068197632338
  },
  {
    "lat": 49.26627312965661,
    "lng": -123.25064119962185
  },
  {
    "lat": 49.26626134594568,
    "lng": -123.2506021717658
  },
  {
    "lat": 49.26625045187782,
    "lng": -123.25056493569126
  }
];

rectangle_coordinates = [
  {
    "lat": 49.266239943677334,
    "lng": -123.25020776713207
  },
  {
    "lat": 49.266231585641584,
    "lng": -123.25023876305228
  },
  {
    "lat": 49.26622194429647,
    "lng": -123.25026725533536
  },
  {
    "lat": 49.266212442491856,
    "lng": -123.25029830456945
  },
  {
    "lat": 49.26620520562758,
    "lng": -123.25033009231777
  },
  {
    "lat": 49.26619840500118,
    "lng": -123.25036196300067
  },
  {
    "lat": 49.26619115532151,
    "lng": -123.25039209931903
  },
  {
    "lat": 49.26618355939894,
    "lng": -123.25041959044499
  },
  {
    "lat": 49.26617605526743,
    "lng": -123.25044926901641
  },
  {
    "lat": 49.26616581237877,
    "lng": -123.25048237450153
  },
  {
    "lat": 49.266159121289355,
    "lng": -123.25051718188018
  },
  {
    "lat": 49.26615135923216,
    "lng": -123.25055379775604
  },
  {
    "lat": 49.26614631828668,
    "lng": -123.25058812711607
  },
  {
    "lat": 49.26613803209562,
    "lng": -123.25062234846195
  },
  {
    "lat": 49.26614040977023,
    "lng": -123.25065383625501
  },
  {
    "lat": 49.26615125208085,
    "lng": -123.2506810461136
  },
  {
    "lat": 49.26617030749666,
    "lng": -123.25070282818471
  },
  {
    "lat": 49.26618929688044,
    "lng": -123.25072005374498
  },
  {
    "lat": 49.26621048562637,
    "lng": -123.25073764489015
  },
  {
    "lat": 49.266232152651135,
    "lng": -123.25075430890153
  },
  {
    "lat": 49.26625236583496,
    "lng": -123.25077002151853
  },
  {
    "lat": 49.2662711189289,
    "lng": -123.2507838128541
  },
  {
    "lat": 49.26628914314748,
    "lng": -123.25079815761457
  },
  {
    "lat": 49.26630732592964,
    "lng": -123.25081335624522
  },
  {
    "lat": 49.26632448699153,
    "lng": -123.25082853126145
  },
  {
    "lat": 49.26634183670032,
    "lng": -123.25084291490161
  },
  {
    "lat": 49.26635926939944,
    "lng": -123.25085676863023
  },
  {
    "lat": 49.26637745708785,
    "lng": -123.25087086620208
  },
  {
    "lat": 49.26639565164094,
    "lng": -123.25088533930818
  },
  {
    "lat": 49.2664144629236,
    "lng": -123.2508990494498
  },
  {
    "lat": 49.26643269612032,
    "lng": -123.25091245538043
  },
  {
    "lat": 49.26645152226914,
    "lng": -123.25092571970379
  },
  {
    "lat": 49.26647011772346,
    "lng": -123.2509394023
  },
  {
    "lat": 49.26648950442304,
    "lng": -123.25095382945756
  },
  {
    "lat": 49.26650864065962,
    "lng": -123.25096846310169
  },
  {
    "lat": 49.266527965420494,
    "lng": -123.25098509105817
  },
  {
    "lat": 49.266547471480884,
    "lng": -123.25100117302303
  },
  {
    "lat": 49.26656779316492,
    "lng": -123.25101825772204
  },
  {
    "lat": 49.266588246641696,
    "lng": -123.25103267482204
  },
  {
    "lat": 49.26660866037684,
    "lng": -123.25104698495464
  },
  {
    "lat": 49.26662892815611,
    "lng": -123.25106064242068
  },
  {
    "lat": 49.266648329398755,
    "lng": -123.25107390872215
  },
  {
    "lat": 49.26666805786334,
    "lng": -123.25108705127734
  },
  {
    "lat": 49.26669073966147,
    "lng": -123.25109093189917
  },
  {
    "lat": 49.2667117332702,
    "lng": -123.25107998122748
  },
  {
    "lat": 49.2667298762751,
    "lng": -123.25105550413089
  },
  {
    "lat": 49.26674069977517,
    "lng": -123.2510237834652
  },
  {
    "lat": 49.26675002468775,
    "lng": -123.25099273720271
  },
  {
    "lat": 49.26675974823049,
    "lng": -123.2509602505108
  },
  {
    "lat": 49.2667703915572,
    "lng": -123.25093080101381
  },
  {
    "lat": 49.26678126924739,
    "lng": -123.25090420300859
  },
  {
    "lat": 49.26679079547051,
    "lng": -123.25087798931399
  },
  {
    "lat": 49.26680042043273,
    "lng": -123.2508485931916
  },
  {
    "lat": 49.26681139535382,
    "lng": -123.2508163197186
  },
  {
    "lat": 49.266821949171344,
    "lng": -123.25078310888385
  },
  {
    "lat": 49.26683216501376,
    "lng": -123.25074981211215
  },
  {
    "lat": 49.26683549783189,
    "lng": -123.25071811469297
  },
  {
    "lat": 49.26682689879843,
    "lng": -123.2506874451833
  },
  {
    "lat": 49.266808189676404,
    "lng": -123.25066372193966
  },
  {
    "lat": 49.266783144077664,
    "lng": -123.25064152951909
  },
  {
    "lat": 49.266761990124934,
    "lng": -123.25062422232219
  },
  {
    "lat": 49.2667418534683,
    "lng": -123.2506063699782
  },
  {
    "lat": 49.26672360257131,
    "lng": -123.2505885970668
  },
  {
    "lat": 49.266704210061825,
    "lng": -123.250569460227
  },
  {
    "lat": 49.26668474616387,
    "lng": -123.25054917907194
  },
  {
    "lat": 49.26666922478631,
    "lng": -123.25052817971918
  },
  {
    "lat": 49.266655401032686,
    "lng": -123.2505073849672
  },
  {
    "lat": 49.26664086697776,
    "lng": -123.25048539606227
  },
  {
    "lat": 49.26662287286751,
    "lng": -123.25046943941514
  },
  {
    "lat": 49.2666050783599,
    "lng": -123.25044839030049
  },
  {
    "lat": 49.26658921119385,
    "lng": -123.25042723149797
  },
  {
    "lat": 49.26657530207592,
    "lng": -123.25040227642704
  },
  {
    "lat": 49.26655991200719,
    "lng": -123.25038398726811
  },
  {
    "lat": 49.266541098846375,
    "lng": -123.2503703141308
  },
  {
    "lat": 49.26651835542781,
    "lng": -123.25036062133829
  },
  {
    "lat": 49.26649450185517,
    "lng": -123.25035051545257
  },
  {
    "lat": 49.26647094139565,
    "lng": -123.25033954777511
  },
  {
    "lat": 49.26644951195576,
    "lng": -123.25032345138167
  },
  {
    "lat": 49.26643010193351,
    "lng": -123.2503078701978
  },
  {
    "lat": 49.26641277048876,
    "lng": -123.25029201314324
  },
  {
    "lat": 49.26639597658132,
    "lng": -123.25027719584693
  },
  {
    "lat": 49.266384566752606,
    "lng": -123.25015693337696
  },
  {
    "lat": 49.26633005217943,
    "lng": -123.25010897612837
  },
  {
    "lat": 49.266278338664456,
    "lng": -123.25007664051209
  },
  {
    "lat": 49.266224233479484,
    "lng": -123.25016397994314
  },
  {
    "lat": 49.266211981931015,
    "lng": -123.25018169369851
  },
  {
    "lat": 49.26620999821404,
    "lng": -123.25018750515137
  },
  {
    "lat": 49.26621655006844,
    "lng": -123.25018328626011
  },
  {
    "lat": 49.26622559142783,
    "lng": -123.25016746837628
  }
]


def plot_coordinates(coordinates, user_id, attempt_id, output_dir="images"):
    """
    Plots the given coordinates on a map and saves the plot as an image file.
    
    Args:
    - coordinates: List of dictionaries containing latitude and longitude.
    - user_id: The ID of the user making the attempt.
    - attempt_id: The ID of the attempt being plotted.
    - output_dir: Directory where the plot will be saved (default is "images").
    """
    # Ensure the images folder exists
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Extract latitudes and longitudes
    latitudes = [point["lat"] for point in coordinates]
    longitudes = [point["lng"] for point in coordinates]

    # Normalize coordinates to fit in a canvas
    min_lat, max_lat = min(latitudes), max(latitudes)
    min_lng, max_lng = min(longitudes), max(longitudes)

    normalized_coords = [
        {
            "x": (lng - min_lng) / (max_lng - min_lng),
            "y": (lat - min_lat) / (max_lat - min_lat)
        }
        for lat, lng in zip(latitudes, longitudes)
    ]
    
    # Create the plot
    plt.figure(figsize=(8, 8))
    plt.plot(longitudes, latitudes, marker='o', linestyle='-', color='b', markersize=5)
    plt.title(f"Route Plot for User {user_id}.{attempt_id}")
    plt.xlabel("Longitude")
    plt.ylabel("Latitude")
    
    # Optionally add grid and other plot features
    plt.grid(True)
    plt.gca().set_aspect('equal', adjustable='box')  # Ensure square aspect ratio

    # Save the plot to a file as PNG
    plot_filename = f"{user_id}.{attempt_id}.png"
    plot_filepath = os.path.join(output_dir, plot_filename)
    plt.savefig(plot_filepath, format='png')  # Ensure the format is 'png'
    plt.close()

    print(f"Plot saved as {plot_filepath}")
    return plot_filepath

output_path = plot_coordinates(star_coordinates, user_id="U001", attempt_id=1)

# You can now access the saved plot via output_path
print(f"The plot has been saved at: {output_path}")