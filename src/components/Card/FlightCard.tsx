import { IFlightData } from "@/lib/api";
import { Card, CardFooter } from "./CardComponent";
import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon } from "lucide-react";
import { buttonVariants } from "../Button";

export function FlightCard(props: { flight: IFlightData, onDelete: (id: string) => void; }) {
  return (
    <Card title={props.flight.code}>
      <div className="flex items-center">
        <img className="w-1/4" data-testid="flight-card-image" src={props.flight.img} alt={props.flight.code} />
        <div className="ml-4">
          <p className="flex gap-2"><span>Departure:</span>{props.flight.departureDate}</p>
          <p className="flex gap-2"><span>Status:</span>{props.flight.status}</p>
          <CardFooter className="flex justify-between gap-4 mt-4">
            <Link
              className={buttonVariants({ variant: "default" }) + " basis-6/12"}
              to={"/flight/" + props.flight.id}
            >
              <span>Edit</span>
              <EditIcon />
            </Link>
            <button
              className={
                buttonVariants({ variant: "destructive" }) + " basis-6/12"
              }
              onClick={() => props.onDelete(props.flight.id)}
            >
              <span>Delete</span> <DeleteIcon />
            </button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
