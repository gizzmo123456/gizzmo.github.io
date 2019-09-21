# Turn .obj file into JS file :)
# Stupid cross origin issue and no apache :(
# Version 2.0;
# iv made v2 sine i can pre-compute some stuff
# TEST OBJ PATH: D:\Ashley Sands\AMStrike Web\3dCanvas\sq.obj

import json

# v and f from .obj file :)
v = []
f = []

min_value = 0
max_value = 0
has_first_min_max = False

filename = input("Enter Filename: ")
print("Output filename:", filename+".js", "\n")
scale = int(input("Enter Scale: (int only)"))

#  value: the 3 values from v lines
def update_min_max(values):

    global has_first_min_max, min_value, max_value

    for v in values:
        if float(v) < min_value or not has_first_min_max:
            min_value = float(v)

        if float(v) > max_value or not has_first_min_max:
            max_value = float(v)

        has_first_min_max = True;


# get v values in the range of -scaled and scale
# value: the 3 values from v lines
def get_scaled(values):

    dif = max_value - min_value
    vals = []
    for i in range(0, len(values), 1):
        vals.append(((((max_value - float(values[i])) / dif) * 2.0) - 1) * scale)

    return vals


# load file
file = open(filename, "r")
file_lines = file.readlines()

# get all the lines that start with 'v ' or 'f '
# we have to make sore there is a space after since there is also lines that
# start with 'vn' and 'vt'
counter = 0;
for line in file_lines:

    if line[0:2] == "f " or line[0:2] == "v ":
        line_type = line[0]
        line = line[2:len(line) - 1]  # remove the f or v and line break
        while line[0] == " ":   # make sure we remove all spaces
            line = line[1:]

        # split the rest of the line into the individual values
        line = line.split(' ')
        # append the value line to corresponding list,
        if line_type == 'v':    # position in 3d space (vector 3)
            update_min_max(line)
            v.append(line)
        elif line_type == 'f':  # face (v_id)
            # extract the first number from each value
            # since it's the id to the v value.
            # we also need to take 1 as it starts a 1
            face = []
            for l in line:
                if l == " " or l == "":
                    continue
                face.append(int(l.split('/')[0])-1)
            f.append(face)
    print("line ", counter, " of ", len(file_lines), " complete")
    counter += 1

file.close()

print("Generating file. Total face count: ", len(f))

# reset the counter
counter = 0

# convert all the f values into corresponding v values
# in the range of -scale, scale
for face_id in range(0, len(f), 1):
    for v_id in range(0, len(f[face_id]), 1):
        f[face_id][v_id] = get_scaled( v[f[face_id][v_id]] )
    print("face ", counter, " of ", len(f), " complete")
    counter += 1;

print("Outputing file, Please Wait... (i may apear to hang for large files)")


# finally we can output the f list in to js file as an array.
file = open(filename+".js", "w")

# we can just convert the f list to json sines that JS :)
output = "var faces = "+json.dumps(f)
file.writelines(output)

file.close()


print("Min:", min_value, "- max:", max_value)
print("------OUTPUT------")
print(output)
input("\nComplete!\nHit Enter to exit")
