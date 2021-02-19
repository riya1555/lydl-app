import React, { useRef, useState, useEffect, useContext } from "react";
import { Slider } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import "./styles.css";

const useStyles = makeStyles({
  vertical: {
    height: 600
  },
  horizontal: {
    width: 300,
    margin: "0 auto"
  }
});

const CustomSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
    "&$vertical": {
      width: 8
    }
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover": {
      boxShadow: "0px 0px 0px 8px rgba(84, 199, 97, 0.16)"
    },
    "&$active": {
      boxShadow: "0px 0px 0px 12px rgba(84, 199, 97, 0.16)"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  },
  vertical: {
    "& $rail": {
      width: 8
    },
    "& $track": {
      width: 8
    },
    "& $thumb": {
      marginLeft: -8,
      marginBottom: -11
    }
  }
})(Slider);
function valuetext(value) {
  if (value <= 4) {
    return `12 AM`;
  }
  if (value < 50) {
    return `${Math.floor((value * 12) / 50)} AM`;
  }
  if (value <= 54) {
    return `12 PM`;
  } else {
    return `${Math.floor(((value - 50) * 12) / 50)} PM`;
  }
}





export default function VerticalSlider(props) {
  const classes = useStyles();
  const [fetched, setfetched] = useState(false);
  const [items, setItems] = useState([]);
  const [marks, setMarks] = useState([]);
  let marksMap = new Map([]);

  function getlabel(marksM,fromtime) {
    let str = " "+fromtime+"AM ";
    marksM.forEach((p) => {
      str += "~ " + p;
    });
    return str;
  }
  useEffect(() => {
    console.log(items);
    items.forEach((element) => {
      console.log(element.fromhr);
      marksMap[element.fromhr]
        ? (marksMap[element.fromhr] = [
            ...marksMap[element.fromhr],
            element.taskName
          ])
        : (marksMap[element.fromhr] = [element.taskName]);
      for (const property in marksMap) {
        setMarks([
          ...marks,
          {
            value: property,
            label: getlabel(marksMap[property],property)
          }
        ]);
      }
    });
  }, [items]);
  useEffect(() => {
    fetch("https://randomuser.me/api/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
          setItems([
            {
              belongsTo: "5f90a71b45657a1309a51626",
              completed: false,
              date: "2020-11-03T13:39:44.542Z",
              datenum: 3,
              datesSkipped: [],
              fromhr: 50,
              fromTime: 6,
              monthnum: 10,
              repeat: "Everyday",
              skips: 2,
              skipsperweek: 1,
              streak: 0,
              taskDescription: "1 hr web development",
              taskName: "development",
              taskScore: 0,
              taskTier: 0,
              taskType: "productive",
              toTime: "",
              yearnum: 120,
              __v: 0,
              _id: "5fa15dbd917c3a001724f97d"
            },
            {
              fromhr: 50,
              taskName: "ervr"
            }
          ]);
        } else {
          setItems([
            {
              belongsTo: "5f90a71b45657a1309a51626",
              completed: false,
              date: "2020-11-03T13:39:44.542Z",
              datenum: 3,
              datesSkipped: [],
              fromhr: 50,
              fromTime: 6,
              monthnum: 10,
              repeat: "Everyday",
              skips: 2,
              skipsperweek: 1,
              streak: 0,
              taskDescription: "1 hr web development",
              taskName: "development",
              taskScore: 0,
              taskTier: 0,
              taskType: "productive",
              toTime: "",
              yearnum: 120,
              __v: 0,
              _id: "5fa15dbd917c3a001724f97d"
            },
            {
              fromhr: 50,
              taskName: "ervr"
            }
          ]);
          setfetched(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>Material-UI - Custom Sliders</h1>
      <h2>Vertical Slider</h2>
      <div className={classes.vertical}>
        <CustomSlider
          orientation="vertical"
          defaultValue={50}
          valueLabelDisplay="auto"
          marks={marks}
          getAriaValueText={(value) => valuetext(value)}
          valueLabelFormat={valuetext}
        />
      </div>
    </div>
  );
}
